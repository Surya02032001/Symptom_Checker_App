import pickle
from flashtext import KeywordProcessor
import numpy as np
import regex as re

# Load the symptoms list
with open('./symptoms.pkl', 'rb') as file:
    symptoms = pickle.load(file)

keyword_processor = KeywordProcessor()
keyword_processor.add_keywords_from_list(symptoms)

with open('./gbm_model.pkl', 'rb') as file:
        gbm = pickle.load(file)

with open('./features.pkl', 'rb') as file:
    features = pickle.load(file)

feature_dict = {}
for i,f in enumerate(features):
    feature_dict[f] = i

def predict_disease(query):
    matched_keyword = keyword_processor.extract_keywords(query)
    if len(matched_keyword) == 0:
        print("No Matches")
    else:
        regex = re.compile(' ')
        processed_keywords = [i if regex.search(i) == None else i.replace(' ', '_') for i in matched_keyword]
        print(processed_keywords)
        coded_features = []
        for keyword in processed_keywords:
            coded_features.append(feature_dict[keyword])
        #print(coded_features)
        sample_x = []
        for i in range(len(features)):
            try:
                sample_x.append(i/coded_features[coded_features.index(i)])
            except:
                sample_x.append(i*0)
        sample_x = np.array(sample_x).reshape(1,len(sample_x))
        print('Predicted Disease: ',gbm.predict(sample_x)[0])
        return gbm.predict(sample_x)[0]
    
query = 'i have redness in eyes and flu'
predict_disease(query)