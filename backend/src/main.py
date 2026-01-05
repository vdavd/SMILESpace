import os
import pandas as pd
import json
from io import StringIO
from typing import List
from fastapi import FastAPI, Request, Query, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from util.temp_file_cleanup import start_scheduler
from util.validation import validate_dataframe, validate_target_smiles
from util.analyze_data import analyze_plot_data
from util.analyze_data import analyze_similarity_data
from util.sanitize_df import df_to_json_safe_dict
from util.save_fingerprints import save_fingerprints_csv_gz
from util.config import TMP_DIR

app = FastAPI()

origins = [os.getenv("FRONTEND_ORIGIN"), "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )


app.add_middleware(
    GZipMiddleware,
    minimum_size=1000  # bytes
)

@app.on_event("startup")
def startup():
    start_scheduler()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/api/plotData")
async def process_plot_data(    request: Request,
    smiles_column: str = Query(..., alias="smilesColumn"),
    dim_red_method: str = Query(..., alias="dimRedMethod"),
    fingerprint_type: str = Query(..., alias="fingerPrintType"),
    remove_outliers: bool = Query(..., alias="removeOutliers"),
    outlier_percentage: int = Query(..., alias="outlierPercentage"),
    number_neighbors_umap: int = Query(..., alias="numberNeighborsUmap")
):
    # Read raw CSV text from body
    csv_bytes = await request.body()
    csv_text = csv_bytes.decode("utf-8")

    # Load into pandas
    df = pd.read_csv(StringIO(csv_text))

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    result_df, smiles_fps_df = analyze_plot_data(df, smiles_column, dim_red_method, fingerprint_type, remove_outliers, outlier_percentage, number_neighbors_umap)

    job_id = save_fingerprints_csv_gz(smiles_fps_df)

    response = {
    "visualizationData": df_to_json_safe_dict(result_df),
    "fingerprintDownloadUrl": f"/download/fingerprints/{job_id}",
    }

    return response

@app.post("/api/similarityData")
async def process_similarity_data(    request: Request,
    smiles_column: str = Query(..., alias="smilesColumn"),
    target_smiles: List[str] = Query(..., alias="targetSmiles"),
    fingerprint_type: str = Query(..., alias="fingerPrintType")
    ):

    print(target_smiles)
    # Read raw CSV text from body
    csv_bytes = await request.body()
    csv_text = csv_bytes.decode("utf-8")

    df = pd.read_csv(StringIO(csv_text))

    df = df.reset_index(drop=True)
    
    if not validate_dataframe(df, smiles_column):
        return {"error": "SMILES not found"}
    
    validate_target_smiles(target_smiles)
    
    result_df, smiles_fps_df, target_smiles_fps_df = analyze_similarity_data(df, smiles_column, target_smiles, fingerprint_type)

    job_id = save_fingerprints_csv_gz(smiles_fps_df)
    target_job_id = save_fingerprints_csv_gz(target_smiles_fps_df)

    response = {
    "similarityData": df_to_json_safe_dict(result_df,orient="records"),
    "fingerprintDownloadUrl": f"/download/fingerprints/{job_id}",
    "targetFingerprintDownloadUrl": f"/download/fingerprints/{target_job_id}"
    }

    return response

@app.get("/api/download/fingerprints/{job_id}")
def download_fingerprints(job_id: str):
    file_path = TMP_DIR / f"{job_id}.csv.gz"

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File expired")

    return FileResponse(
        path=file_path,
        media_type="application/gzip",
        filename="fingerprints.csv.gz",
    )