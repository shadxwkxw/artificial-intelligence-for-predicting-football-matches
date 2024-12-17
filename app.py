import numpy as np
import csv
from flask import Flask, request, jsonify, render_template
from tensorflow import keras

global df
app = Flask(__name__)
model = keras.models.load_model('football_model.h5')

def predict_game(HomeTeam, AwayTeam):
    try:
        input_data = np.array([[HomeTeam, AwayTeam]]) #принимаем два введенных значения с поля input в список
        prediction = model.predict(input_data)
        print(f"Raw prediction probabilities: {prediction}") 

        predicted_result = np.argmax(prediction)
        home_team = f"Команда {HomeTeam}"
        away_team = f"Команда {AwayTeam}"
        return get_result_string(predicted_result, home_team, away_team)
    except Exception as e:
        return f"Произошла ошибка: {str(e)}"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/teams', methods=['GET'])
def get_teams():
    try:
        teams = set()
        with open('главный датасет.csv', 'r', encoding='utf-8') as csvfile: # Specify encoding if needed
            reader = csv.DictReader(csvfile) # Assumes a header row in your CSV
            for row in reader:
                teams.add(row['HomeTeam'])

        teams_list = [{'team': team, 'id': i + 1} for i, team in enumerate(sorted(list(teams)))]
        return jsonify({'teams': teams_list})

    except FileNotFoundError:
        return jsonify({'error': 'CSV file not found'}), 500
    except KeyError as e:
        return jsonify({'error': f'Missing column in CSV: {e}'}), 500  # Handle missing 'HomeTeam' column
    except Exception as e:
        return jsonify({'error': f'An error occurred: {e}'}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        team1_id = int(data['team1Id'])
        team2_id = int(data['team2Id'])
        prediction = predict_game(team1_id, team2_id)
        
        print(f"Prediction: {prediction}")
        
        return jsonify({'prediction': prediction})
    except (KeyError, ValueError) as e:
        return jsonify({'error': str(e)}), 400
    
def get_result_string(prediction, home_team, away_team):
    if prediction == 1:
        return f"{home_team} победила {away_team}"
    elif prediction == 0:
        return f"{away_team} победила {home_team}"
    elif prediction == 2:
        return f"{home_team} и {away_team} - ничья"
    else:
        return "Неизвестный результат"
    
if __name__ == '__main__':
    app.run(debug=True)

