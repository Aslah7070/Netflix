// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
     "Sign In": "Sign In",
      "Sign Out": "Sign Out",
      "Get Started": "Get Started",
      "Popular Now": "Popular Now",
      "Plans": "Plans",
      "Reason to Join": "Reason to Join",
      "FAQ": "FAQ",
      "Unlimited movies, TV shows and more": "Unlimited movies, TV shows, and more",
      "Starts at": "Starts at",
      "Cancel anytime": "Cancel anytime",
      "Ready to watch?": "Ready to watch? Enter your email to create or restart your membership",
      "Finish Sign Up": "Finish Sign Up",
      "What is Netflix?": "What is Netflix?",
      "How much does Netflix cost?": "How much does Netflix cost?",
      "Where can I watch?": "Where can I watch?",
      "How do I cancel?": "How do I cancel?",
      "What can I watch on Netflix?": "What can I watch on Netflix?",
      "Is Netflix good for kids?": "Is Netflix good for kids?",
    },
  },
  hi: {
    translation: {
     "Sign In": "साइन इन करें",
      "Sign Out": "साइन आउट करें",
      "Get Started": "शुरू करें",
      "Popular Now": "अब लोकप्रिय",
      "Plans": "योजनाएँ",
      "Reason to Join": "जुड़ने का कारण",
      "FAQ": "सामान्य प्रश्न",
      "Unlimited movies, TV shows and more": "अनगिनत फिल्में, टीवी शो और अधिक",
      "Starts at": "शुरू होता है",
      "Cancel anytime": "कभी भी रद्द करें",
      "Ready to watch?": "देखने के लिए तैयार हैं? अपना ईमेल दर्ज करें",
      "Finish Sign Up": "साइन अप समाप्त करें",
      "What is Netflix?": "नेटफ्लिक्स क्या है?",
      "How much does Netflix cost?": "नेटफ्लिक्स की कीमत कितनी है?",
      "Where can I watch?": "मैं कहाँ देख सकता हूँ?",
      "How do I cancel?": "मैं इसे कैसे रद्द कर सकता हूँ?",
      "What can I watch on Netflix?": "मैं नेटफ्लिक्स पर क्या देख सकता हूँ?",
      "Is Netflix good for kids?": "क्या नेटफ्लिक्स बच्चों के लिए अच्छा है?",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
