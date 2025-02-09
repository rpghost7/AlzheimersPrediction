import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from imblearn.under_sampling import RandomUnderSampler
from sklearn.model_selection import train_test_split
import pickle

data_imputed = pd.read_csv('C:/Users/risha/OneDrive/Desktop/Biostat Project/myapp/Backend/clinical_data_imputed2.csv')


X_i = data_imputed[['Glu', 'Cho', 'TG', 'LDL', 'Homoc', 'Transf', 'ferrit', 'Hb', 'CardiolIGG', 'CardioIGM', 'TP', 'Fifrinogeno', 'T3', 'TSH', 'T4', 'B12', 'FOLICO', 'IGF1', 'BDNF', 'NGF', 'Nitritos', 'TNF', 'IL6']]
y_i = data_imputed['Diagnostico']
model = RandomForestClassifier(
    n_estimators=50,   
    max_depth=6,               # Reduce overfitting (previously 10)
    min_samples_split=10,      # Prevents excessive splits
    min_samples_leaf=5,        # Enforces generalization
    max_features="log2",       # Reduce over-reliance on dominant features
    class_weight={0: 1.5, 1: 1},
    bootstrap=True,
    max_samples=0.8,
    random_state=42,
    n_jobs=-1
)
undersampler = RandomUnderSampler(random_state = 42)
Xi_re, yi_re = undersampler.fit_resample(X_i, y_i)
Xi_train, Xi_test, yi_train, yi_test = train_test_split(Xi_re, yi_re, test_size=0.1, random_state=42)
model.fit(Xi_train, yi_train)
# row = Xi_test.sample(n=1, random_state=1)
# row_index = row.index[0]
# y_pred = model.predict(row)
# print(y_pred)
# print(data_imputed.iloc[row_index])

# Save model using pickle
with open("model2.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved as model2.pkl")
