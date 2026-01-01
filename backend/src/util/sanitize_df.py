import numpy as np
import pandas as pd

def df_to_json_safe_dict(df, orient="dict"):
    return (
        df
        .replace([np.inf, -np.inf, np.nan], None)
        .where(pd.notna(df), None)
        .to_dict(orient=orient)
    )
