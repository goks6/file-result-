# मूल्यमापन (Assessment) - शैक्षणिक गुण व्यवस्थापन

![मूल्यमापन Logo](https://img.shields.io/badge/मूल्यमापन-Educational%20Assessment-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.72-61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-FFA611)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6)

> **मराठी शिक्षण संस्थांसाठी संपूर्ण शैक्षणिक गुण व्यवस्थापन सिस्टम**

## मुख्य वैशिष्ट्ये (Key Features)

### 📚 विद्यार्थी मूल्यमापन व्यवस्था
- **कक्षा निवड**: १ली ते ८वी वर्गापर्यंत
- **विषयवार गुण प्रविष्टी**: मराठी, इंग्रजी, गणित, विज्ञान, इतिहास, भूगोल, चित्रकला
- **परीक्षा प्रकार**: मासिक, अर्धवार्षिक, वार्षिक
- **गुणांकन पद्धती**: 100 पैकी गुण आणि ग्रेड सिस्टम
- **स्वयंचलित टक्केवारी गणना**

### 📄 रिपोर्ट कार्ड जनरेशन
- **PDF रिपोर्ट कार्ड** डाउनलोड
- **शालेय माहिती** समाविष्ट
- **विद्यार्थी तपशील** आणि **वडील नाव**
- **विषयवार गुण** प्रदर्शन
- **एकूण टक्केवारी** आणि **श्रेणी**
- **सुंदर मराठी डिझाइन**

### 🔥 डेटा व्यवस्थापन
- **Firebase Realtime Database** integration
- **विद्यार्थी यादी** व्यवस्थापन
- **गुण संचयन** आणि **अपडेट**
- **Real-time** डेटा सिंक्रोनायझेशन

### 📊 विश्लेषण आणि अहवाल
- **कक्षावार परिणाम** विश्लेषण
- **विषयवार कामगिरी** चार्ट
- **उत्तीर्ण/अनुत्तीर्ण** आकडेवारी
- **रँकिंग सिस्टम**
- **Interactive Charts** (Bar, Line, Pie)

### 🎨 UI/UX वैशिष्ट्ये
- **मराठी भाषा** interface
- **रंगीत आकर्षक** Material Design
- **सहज वापर** (User-friendly)
- **टॅब नेव्हिगेशन**
- **Responsive** डिझाइन

## तांत्रिक तपशील (Technical Details)

### 🛠️ Technology Stack
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **Navigation**: React Navigation
- **Charts**: React Native Chart Kit
- **Backend**: Firebase Realtime Database
- **PDF Generation**: Expo Print + Sharing
- **State Management**: React Hooks

### 📦 Dependencies
```json
{
  "expo": "~49.0.0",
  "react-native": "0.72.6",
  "react-native-paper": "^5.10.6",
  "firebase": "^10.1.0",
  "expo-print": "~12.0.0",
  "react-native-chart-kit": "^6.12.0"
}
```

## स्थापना सूचना (Installation)

### आवश्यकता (Prerequisites)
- Node.js (v16 या उपरिति)
- Expo CLI
- Firebase प्रकल्प
- Android Studio / Xcode (native development साठी)

### कोड डाउनलोड करा
```bash
git clone https://github.com/goks6/file-result-.git
cd file-result-
```

### Dependencies स्थापित करा
```bash
npm install
```

### Firebase कॉन्फिगरेशन
1. Firebase console मध्ये नवीन प्रकल्प तयार करा
2. Realtime Database सक्षम करा
3. `src/services/firebase.ts` मध्ये आपला config अपडेट करा:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  // ... अन्य config
};
```

### अॅप चालवा
```bash
# Development server सुरू करा
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## वापर (Usage)

### 1. गुण प्रविष्टी
- विद्यार्थी निवडा
- विषय निवडा
- परीक्षा प्रकार निवडा
- गुण टाका
- जतन करा

### 2. रिपोर्ट तयार करणे
- विद्यार्थी निवडा
- "PDF रिपोर्ट डाउनलोड करा" दाबा
- PDF शेअर किंवा सेव्ह करा

### 3. विश्लेषण पाहणे
- वर्गवार कामगिरी चार्ट
- विषयवार परिणाम
- श्रेणी वितरण
- सांख्यिकी माहिती

## शैक्षणिक मानके (Educational Standards)

### Maharashtra State Board अनुसार
- **CCE (Continuous Comprehensive Evaluation)** पद्धती
- **Formative** आणि **Summative** assessment
- **Learning outcomes** tracking
- **Grade-wise** सिलेबस support

### Grading System
```
A+ (90-100%) - उत्कृष्ट
A  (80-89%)  - अति उत्तम  
B+ (70-79%)  - उत्तम
B  (60-69%)  - चांगले
C+ (50-59%)  - सरासरीपेक्षा चांगले
C  (40-49%)  - सरासरी
D  (35-39%)  - उत्तीर्ण
F  (0-34%)   - अनुत्तीर्ण
```

## योगदान (Contributing)

आम्ही community contributions चे स्वागत करतो!

1. **Fork** करा
2. **Feature branch** तयार करा (`git checkout -b feature/AmazingFeature`)
3. **Commit** करा (`git commit -m 'Add some AmazingFeature'`)
4. **Push** करा (`git push origin feature/AmazingFeature`)
5. **Pull Request** उघडा

## समस्या निवारण (Troubleshooting)

### सामान्य समस्या
1. **Metro bundler error**: `npx react-native start --reset-cache`
2. **Android build issues**: `cd android && ./gradlew clean`
3. **iOS build issues**: `cd ios && pod install`

### Firebase सेटअप समस्या
- Database rules योग्य ठेवल्या का ते तपासा
- API keys valid आहेत का ते तपासा
- Network connectivity तपासा

## परवाना (License)

MIT License - तपशीलासाठी [LICENSE](LICENSE) फाईल पहा.

## संपर्क (Contact)

- **Developer**: Assessment Team
- **Email**: assessment@example.com
- **GitHub**: [goks6/file-result-](https://github.com/goks6/file-result-)

## आभार (Acknowledgments)

- **Maharashtra State Board** - शैक्षणिक मानके
- **React Native Community** - अप्रतिम framework
- **Firebase** - विश्वसनीय backend services
- **Expo** - सोप्या development साठी

---

**"शिक्षणातील प्रगतीसाठी तंत्रज्ञानाचा वापर"** 🇮🇳

Made with ❤️ for Maharashtra's Education System