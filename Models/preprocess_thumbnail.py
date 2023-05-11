from tensorflow.keras.models import load_model
from tensorflow.keras.applications import VGG16, ResNet50V2, ResNet101V2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, MaxPool2D, Conv2D, Flatten
from tensorflow.keras.layers import BatchNormalization, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import pickle
from tqdm import tqdm

def process():
    print("Thumbnail Model Updating...")
    model = load_model('/Users/sowon/Desktop/SCSA/Noon/Models/model_52318.h5')
    test_datagen = ImageDataGenerator(rescale=1./255)

    total_predict = {}
    with open('./titleIds.pkl', 'rb') as f:
        titleIds = pickle.load(f)


    for titleId in titleIds:
        test_data = test_datagen.flow_from_directory('/Users/sowon/Desktop/SCSA/Noon/Data/Thumbnails',
                                        target_size=(224, 224), 
                                        batch_size=1,
                                        shuffle=False,
                                        classes = [str(titleId)]
                                        )
        pred = model.predict(test_data)

        for i in range(1, len(pred)):
            pred[0] += pred[i]
        total_predict[titleId] = pred[0]

    with open('../Data/Result/Thumbnails.pkl', 'wb') as f:
        pickle.dump(total_predict, f)
    print(f'{len(total_predict)} / {len(titleIds)} webtoons recommendation predicted')
