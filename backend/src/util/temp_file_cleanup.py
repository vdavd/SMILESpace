from apscheduler.schedulers.background import BackgroundScheduler
import time
from .config import TMP_DIR, JOB_TTL_SECONDS

def cleanup_temp_files():
    now = time.time()

    for file in TMP_DIR.glob("*.csv.gz"):
        if now - file.stat().st_mtime > JOB_TTL_SECONDS:
            file.unlink(missing_ok=True)

def start_scheduler():
    scheduler = BackgroundScheduler(daemon=True)
    scheduler.add_job(cleanup_temp_files, "interval", minutes=10)
    scheduler.start()