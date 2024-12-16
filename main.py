import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential
from keras.layers import Dense
from sklearn.datasets import make_classification

import tensorflow as tf

data = pd.read_csv('главный датасет.csv')
df = pd.DataFrame(data)

# Присваиваем уникальный номер каждой команде
df['Номер команды домашние'] = df['HomeTeam'].astype('category').cat.codes + 1
df['Номер команды на выезде'] = df['AwayTeam'].astype('category').cat.codes + 1

df = df.drop('Time', axis=1)
df = df.drop('Date', axis=1)
df = df.drop('Div', axis=1)
df = df.drop('HomeTeam', axis=1)
df = df.drop('AwayTeam', axis=1)
df = df.drop('Referee', axis=1)
df = df.drop('FTR', axis=1)
df = df.drop('HTR', axis=1)
df = df.astype('float32')
# Печатаем результат

print(df)

df['result'] = np.where(df['FTHG'] > df['FTAG'], 1,
                          np.where(df['FTHG'] < df['FTAG'], 0, 2))

features = [ "Номер команды домашние", "Номер команды на выезде", "FTHG","FTAG","HTHG","HTAG","HS","AS","HST","AST","HF","AF","HC","AC","HY","AY","HR","AR","B365H","B365D","B365A","BWH","BWD","BWA","BFH","BFD","BFA","PSH","PSD","PSA","WHH","WHD","WHA","1XBH","1XBD","1XBA","MaxH","MaxD","MaxA","AvgH","AvgD","AvgA","BFEH","BFED","BFEA","B365>2.5","B365<2.5","P>2.5","P<2.5","Max>2.5","Max<2.5","Avg>2.5","Avg<2.5","BFE>2.5","BFE<2.5","AHh","B365AHH","B365AHA","PAHH","PAHA","MaxAHH","MaxAHA","AvgAHH","AvgAHA","BFEAHH","BFEAHA","B365CH","B365CD","B365CA","BWCH","BWCD","BWCA","BFCH","BFCD","BFCA","PSCH","PSCD","PSCA","WHCH","WHCD","WHCA","1XBCH","1XBCD","1XBCA","MaxCH","MaxCD","MaxCA","AvgCH","AvgCD","AvgCA","BFECH","BFECD","BFECA","B365C>2.5","B365C<2.5","PC>2.5","PC<2.5","MaxC>2.5","MaxC<2.5","AvgC>2.5","AvgC<2.5","BFEC>2.5","BFEC<2.5","AHCh","B365CAHH","B365CAHA","PCAHH","PCAHA","MaxCAHH","MaxCAHA","AvgCAHH","AvgCAHA","BFECAHH","BFECAHA"]  # Добавьте другие признаки по необходимости
X = df[features]
y = df['result']

X = pd.get_dummies(X)
print(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#rf = RandomForestClassifier(n_estimators=100, random_state=42)
#rf.fit(X_train, y_train)
from sklearn.impute import SimpleImputer
from sklearn.decomposition import PCA

imputer = SimpleImputer(strategy='mean')

X_train_imputed = imputer.fit_transform(X_train)
X_test_imputed = imputer.transform(X_test)

pca = PCA(n_components=2)
X_train_pca = pca.fit_transform(X_train_imputed)
X_test_pca = pca.transform(X_test_imputed)

scaler = StandardScaler()
X_train_rf = scaler.fit_transform(X_train_pca)
X_test_rf = scaler.transform(X_test_pca)

model = Sequential()
model.add(Dense(64, input_dim=X_train_rf.shape[1], activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(3, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X_train_rf, y_train, epochs=500, batch_size=4096, verbose=1)

loss, accuracy = model.evaluate(X_test_rf, y_test)
print(f'Accuracy: {accuracy:.4f}')

# Предсказание результатов на тестовых данных
predictions = model.predict(X_test_rf)
predicted_classes = np.argmax(predictions, axis=1)

# Получаем индексы из DataFrame
test_indices = X_test.index if hasattr(X_test, 'index') else np.arange(len(X_test))

# Получаем названия команд и фактические результаты из DataFrame
home_teams = df.loc[test_indices, 'Номер команды домашние']
away_teams = df.loc[test_indices, 'Номер команды на выезде']
actual_results = df.loc[test_indices, 'result']

# Создаем вывод
for i in range(len(predicted_classes)):
    home_team = home_teams.iloc[i]
    away_team = away_teams.iloc[i]
    predicted_result = predicted_classes[i]
    actual_result = actual_results.iloc[i]

    # Строка для предсказанного результата
    if predicted_result == 1:
        predicted_result_str = f"{home_team} победила {away_team}"
    elif predicted_result == 0:
        predicted_result_str = f"{away_team} победила {home_team}"
    else:
        predicted_result_str = f"{home_team} и {away_team} - ничья"

    # Строка для фактического результата
    if actual_result == 1:
        actual_result_str = f"{home_team} победила {away_team}"
    elif actual_result == 0:
        actual_result_str = f"{away_team} победила {home_team}"
    else:
        actual_result_str = f"{home_team} и {away_team} - ничья"

    print(f"Предсказанный результат: {predicted_result_str}")
    print(f"Фактический результат: {actual_result_str}")

model.save('football_model.h5') # Сохраняем модель в файл