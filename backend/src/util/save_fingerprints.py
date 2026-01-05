import uuid
import gzip
from .config import TMP_DIR

def save_fingerprints_csv_gz(df) -> str:
    job_id = str(uuid.uuid4())
    file_path = TMP_DIR / f"{job_id}.csv.gz"

    with gzip.open(file_path, "wt", encoding="utf-8", newline="") as f:
        df.to_csv(f, index=False)

    return job_id