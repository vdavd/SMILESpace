from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent
# util → src → backend

TMP_DIR = BASE_DIR / "tmp_fingerprints"
TMP_DIR.mkdir(parents=True, exist_ok=True)

JOB_TTL_SECONDS = 60 * 30