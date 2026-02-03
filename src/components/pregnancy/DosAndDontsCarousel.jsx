import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, X } from 'lucide-react';
import { Button } from '../../components/ui/button';

const firstTrimesterDos = [
  {
    icon: '💧',
    title: 'Drink plenty of clean water.',
    titleBangla: 'পর্যাপ্ত পরিমাণে পরিষ্কার পানি পান করুন।',
    description: 'Stay hydrated by drinking at least 8 glasses of clean water every day. This helps your body and your baby.',
    descriptionBangla: 'প্রতিদিন কমপক্ষে ৮ গ্লাস পরিষ্কার পানি পান করে শরীর সুস্থ রাখুন। এটি আপনার এবং আপনার শিশুর জন্য সহায়ক।'
  },
  {
    icon: '🥗',
    title: 'Eat fresh vegetables & fruits.',
    titleBangla: 'তাজা সবজি ও ফল খেতে হবে।',
    description: 'Colorful fruits and vegetables give vitamins to you and your baby. Try to eat different colors every day.',
    descriptionBangla: 'রঙিন ফল ও সবজি আপনাকে এবং আপনার শিশুকে ভিটামিন দেয়। প্রতিদিন বিভিন্ন ধরনের খাবার খান।'
  },
  {
    icon: '😴',
    title: 'Rest whenever you feel tired.',
    titleBangla: 'ক্লান্ত লাগলে যতটুকু পারেন বিশ্রাম নিন।',
    description: 'Your body is working hard. It\'s okay to rest and sleep more. Listen to your body.',
    descriptionBangla: 'আপনার শরীর কঠোর পরিশ্রম করছে। বিশ্রাম নেওয়া এবং বেশি ঘুমানো ঠিক আছে। আপনার শরীরের কথা শুনুন।'
  },
  {
    icon: '📅',
    title: 'Go for your first ANC check-up.',
    titleBangla: 'প্রথম ANC পরীক্ষা করাতে ডাক্তার দেখান।',
    description: 'Visit a doctor or health clinic early. They will help make sure you and baby are healthy.',
    descriptionBangla: 'প্রথম দিকে ডাক্তার বা স্বাস্থ্য ক্লিনিকে যান। তারা নিশ্চিত করবে আপনি এবং আপনার শিশু সুস্থ আছেন।'
  },
  {
    icon: '💊',
    title: 'Take iron/folic acid as advised.',
    titleBangla: 'পরামর্শমতো আয়রন/ফোলিক এসিড সেবন করুন।',
    description: 'Iron and folic acid help your baby\'s brain and body develop. Take them as the doctor advises.',
    descriptionBangla: 'আয়রন ও ফোলিক এসিড শিশুর মস্তিষ্ক ও শরীরের বিকাশে সহায়তা করে। ডাক্তারের পরামর্শমতো সেবন করুন।'
  },
  {
    icon: '🍽️',
    title: 'Eat small meals more often.',
    titleBangla: 'অল্প অল্প করে বারবার খান।',
    description: 'Small, frequent meals help with nausea and give you steady energy throughout the day.',
    descriptionBangla: 'অল্প পরিমাণে ঘন ঘন খাওয়া বমি ভাব কমায় এবং সারাদিন শক্তি দেয়।'
  },
  {
    icon: '🧼',
    title: 'Wash hands before eating.',
    titleBangla: 'খাওয়ার আগে হাত ধুয়ে নিন।',
    description: 'Clean hands prevent infections. Always wash with soap before meals.',
    descriptionBangla: 'পরিষ্কার হাত সংক্রমণ প্রতিরোধ করে। খাওয়ার আগে সর্বদা সাবান দিয়ে হাত ধুয়ে নিন।'
  },
  {
    icon: '💬',
    title: 'Share your pregnancy with someone you trust.',
    titleBangla: 'বিশ্বাসযোগ্য কারো সাথে আপনার গর্ভধারণের কথা জানান।',
    description: 'Talk to someone you trust about your pregnancy. Support from family or friends is important.',
    descriptionBangla: 'আপনার গর্ভধারণের কথা বিশ্বস্ত কারো সাথে শেয়ার করুন। পরিবার বা বন্ধুদের সমর্থন গুরুত্বপূর্ণ।'
  }
];

const firstTrimesterDonts = [
  {
    icon: '🚬',
    title: 'Don\'t smoke or drink alcohol.',
    titleBangla: 'সিগারেট বা মদ্যপান করবেন না।',
    description: 'Smoking and alcohol can seriously harm your baby\'s development. Ask for help to stop if you need it.',
    descriptionBangla: 'ধূমপান এবং মদ্যপান আপনার শিশুর বিকাশে মারাত্মক ক্ষতি করতে পারে। প্রয়োজনে সাহায্য চান।'
  },
  {
    icon: '💊',
    title: 'Don\'t take any medicine without doctor\'s advice.',
    titleBangla: 'ডাক্তারের পরামর্শ ছাড়া কোনো ওষুধ খাবেন না।',
    description: 'Some medicines can harm your baby. Always ask a doctor or health worker before taking any medicine.',
    descriptionBangla: 'কিছু ওষুধ আপনার শিশুর ক্ষতি করতে পারে। কোনো ওষুধ নেওয়ার আগে সর্বদা ডাক্তার বা স্বাস্থ্যকর্মীকে জিজ্ঞাসা করুন।'
  },
  {
    icon: '🏋️',
    title: 'Don\'t lift anything heavy.',
    titleBangla: 'ভারী কিছু তুলবেন না।',
    description: 'Heavy lifting can hurt your back and harm the baby. Ask someone to help you with heavy work.',
    descriptionBangla: 'ভারী জিনিস তোলা আপনার পিঠে আঘাত করতে পারে এবং শিশুর ক্ষতি করতে পারে। ভারী কাজের জন্য সাহায্য চান।'
  },
  {
    icon: '🍔',
    title: 'Avoid unsafe street food & dirty water.',
    titleBangla: 'অপরিষ্কার খাবার বা পানি এড়িয়ে চলুন।',
    description: 'Unsafe food and dirty water can cause infections. Always eat freshly cooked food and drink clean water.',
    descriptionBangla: 'অনিরাপদ খাবার এবং নোংরা পানি সংক্রমণ ঘটাতে পারে। সর্বদা তাজা রান্না করা খাবার খান এবং পরিষ্কার পানি পান করুন।'
  },
  {
    icon: '🧪',
    title: 'Avoid strong chemicals/cleaning agents.',
    titleBangla: 'তীব্র গন্ধযুক্ত রাসায়নিক পদার্থ এড়িয়ে চলুন।',
    description: 'Strong cleaning products and chemicals can harm you and your baby. Use natural cleaners or ask someone else to clean.',
    descriptionBangla: 'শক্তিশালী পরিষ্কারের পণ্য এবং রাসায়নিক আপনার এবং আপনার শিশুর ক্ষতি করতে পারে। প্রাকৃতিক ক্লিনার ব্যবহার করুন।'
  },
  {
    icon: '🥩',
    title: 'Don\'t eat raw or undercooked meat/fish.',
    titleBangla: 'কাঁচা বা কাঁচা-সিদ্ধ মাংস/মাছ খাবেন না।',
    description: 'Raw or undercooked meat and fish can contain harmful bacteria. Always cook food thoroughly.',
    descriptionBangla: 'কাঁচা বা আধা-সিদ্ধ মাংস ও মাছে ক্ষতিকর ব্যাকটেরিয়া থাকতে পারে। সবসময় খাবার ভালোভাবে রান্না করুন।'
  },
  {
    icon: '😰',
    title: 'Don\'t stress too much — rest your mind.',
    titleBangla: 'মানসিক চাপ কম নিন, শান্ত থাকুন।',
    description: 'Too much stress is not good for you or baby. Try to relax, talk to loved ones, and rest when needed.',
    descriptionBangla: 'অত্যধিক মানসিক চাপ আপনার বা শিশুর জন্য ভালো নয়। শিথিল হওয়ার চেষ্টা করুন, প্রিয়জনদের সাথে কথা বলুন।'
  },
  {
    icon: '🌿',
    title: 'Don\'t try \'random herbal remedies\'.',
    titleBangla: 'যেকোনো ভেষজ চিকিৎসা নিজের মতো করে শুরু করবেন না।',
    description: 'Some herbal remedies can be unsafe during pregnancy. Always check with a doctor before trying any herbs.',
    descriptionBangla: 'কিছু ভেষজ প্রতিকার গর্ভাবস্থায় অনিরাপদ হতে পারে। কোনো ভেষজ চেষ্টা করার আগে ডাক্তারের সাথে পরামর্শ করুন।'
  }
];

const secondTrimesterDos = [
  {
    icon: '👩‍⚕️',
    title: 'Continue regular ANC check-ups.',
    titleBangla: 'নিয়মিত ANC চেক-আপ চালিয়ে যান।',
    description: 'Keep going to your health clinic for regular check-ups. This helps make sure you and baby are healthy.',
    descriptionBangla: 'নিয়মিত স্বাস্থ্য ক্লিনিকে যান। এটি নিশ্চিত করে যে আপনি এবং আপনার শিশু সুস্থ আছেন।'
  },
  {
    icon: '🍛',
    title: 'Eat rice, dal, vegetables, and some protein every day.',
    titleBangla: 'প্রতিদিন ভাত, ডাল, সবজি ও কিছু প্রোটিন (ডিম/মাছ/মাংস) খান।',
    description: 'A balanced meal with rice, lentils, vegetables, and protein (egg, fish, or meat) gives you and your baby strength.',
    descriptionBangla: 'ভাত, ডাল, সবজি এবং প্রোটিনযুক্ত খাবার আপনাকে এবং আপনার শিশুকে শক্তি দেয়।'
  },
  {
    icon: '💧',
    title: 'Drink clean water throughout the day.',
    titleBangla: 'দিনজুড়ে পরিষ্কার পানি পান করুন।',
    description: 'Stay hydrated by drinking clean water regularly throughout the day.',
    descriptionBangla: 'দিনভর নিয়মিত পরিষ্কার পানি পান করে হাইড্রেটেড থাকুন।'
  },
  {
    icon: '🚶‍♀️',
    title: 'Walk gently every day if you can.',
    titleBangla: 'শারীরিকভাবে সক্ষম থাকলে প্রতিদিন একটু হাঁটুন।',
    description: 'Light walking helps your body stay strong and prepares you for delivery.',
    descriptionBangla: 'হালকা হাঁটা আপনার শরীরকে শক্তিশালী রাখে এবং প্রসবের জন্য প্রস্তুত করে।'
  },
  {
    icon: '😴',
    title: 'Try to sleep on your left side.',
    titleBangla: 'বাম পাশে কাত হয়ে ঘুমানোর চেষ্টা করুন।',
    description: 'Sleeping on your left side helps blood flow to your baby and reduces pressure.',
    descriptionBangla: 'বাম পাশে ঘুমালে শিশুর কাছে রক্ত প্রবাহ ভালো হয় এবং চাপ কমে।'
  },
  {
    icon: '💓',
    title: 'Notice your baby\'s movements each day.',
    titleBangla: 'প্রতিদিন বাচ্চার নড়াচড়া অনুভব করার চেষ্টা করুন।',
    description: 'You should feel your baby moving regularly. This is a good sign that baby is healthy.',
    descriptionBangla: 'আপনার শিশুর নিয়মিত নড়াচড়া অনুভব করা উচিত। এটি একটি ভালো লক্ষণ যে শিশু সুস্থ আছে।'
  },
  {
    icon: '👗',
    title: 'Wear loose, comfortable clothes.',
    titleBangla: 'ঢিলেঢালা আরামদায়ক পোশাক পরুন।',
    description: 'Loose clothes like salwar kameez help you feel comfortable as your belly grows.',
    descriptionBangla: 'ঢিলা পোশাক যেমন সালোয়ার কামিজ আপনাকে আরামদায়ক রাখে পেট বড় হওয়ার সাথে সাথে।'
  },
  {
    icon: '💬',
    title: 'Talk to a health worker if you feel worried.',
    titleBangla: 'কিছু নিয়ে চিন্তিত থাকলে স্বাস্থ্যকর্মীর সাথে কথা বলুন।',
    description: 'If you are worried about anything, don\'t hesitate to talk to a health worker or doctor.',
    descriptionBangla: 'কোনো কিছু নিয়ে চিন্তিত থাকলে স্বাস্থ্যকর্মী বা ডাক্তারের সাথে কথা বলতে দ্বিধা করবেন না।'
  }
];

const secondTrimesterDonts = [
  {
    icon: '🏋️',
    title: 'Don\'t lift heavy loads.',
    titleBangla: 'ভারী বোঝা তুলবেন না।',
    description: 'Heavy lifting can hurt you and your baby. Ask others to help with heavy things.',
    descriptionBangla: 'ভারী জিনিস তোলা আপনার এবং আপনার শিশুর ক্ষতি করতে পারে। ভারী কাজের জন্য অন্যদের সাহায্য নিন।'
  },
  {
    icon: '🧍‍♀️',
    title: 'Don\'t stand for very long at a time.',
    titleBangla: 'অনেকক্ষণ একটানা দাঁড়িয়ে থাকবেন না।',
    description: 'Standing too long can make your legs swell and tire you. Take breaks and sit down.',
    descriptionBangla: 'বেশিক্ষণ দাঁড়িয়ে থাকলে পা ফুলতে পারে এবং ক্লান্ত হতে পারেন। বিরতি নিন এবং বসুন।'
  },
  {
    icon: '👔',
    title: 'Don\'t wear tight clothes around your tummy.',
    titleBangla: 'পেটের চারপাশে খুব টাইট পোশাক পরবেন না।',
    description: 'Tight clothes can press on your belly and make you uncomfortable.',
    descriptionBangla: 'টাইট পোশাক আপনার পেটে চাপ দিতে পারে এবং অস্বস্তিকর করতে পারে।'
  },
  {
    icon: '🍔',
    title: 'Avoid too much oily, spicy, or junk food.',
    titleBangla: 'অতিরিক্ত তেল-মশলাদার বা জাঙ্ক ফুড খাওয়া থেকে বিরত থাকুন।',
    description: 'Too much oily or junk food can cause indigestion and is not healthy for you or baby.',
    descriptionBangla: 'অতিরিক্ত তৈলাক্ত বা জাঙ্ক ফুড হজমের সমস্যা তৈরি করতে পারে এবং আপনার বা শিশুর জন্য স্বাস্থ্যকর নয়।'
  },
  {
    icon: '💊',
    title: 'Don\'t take painkillers or other drugs without doctor\'s advice.',
    titleBangla: 'ডাক্তারের পরামর্শ ছাড়া ব্যথার ওষুধ বা অন্য ওষুধ খাবেন না।',
    description: 'Many medicines can harm your baby. Always check with a doctor first.',
    descriptionBangla: 'অনেক ওষুধ আপনার শিশুর ক্ষতি করতে পারে। সর্বদা প্রথমে ডাক্তারের সাথে পরীক্ষা করুন।'
  },
  {
    icon: '😰',
    title: 'Avoid too much physical or mental stress.',
    titleBangla: 'অতিরিক্ত শারীরিক বা মানসিক চাপ এড়িয়ে চলুন।',
    description: 'Too much stress is not good. Rest when you need to and talk to loved ones.',
    descriptionBangla: 'অত্যধিক চাপ ভালো নয়। প্রয়োজন হলে বিশ্রাম নিন এবং প্রিয়জনদের সাথে কথা বলুন।'
  },
  {
    icon: '🛏️',
    title: 'Don\'t sleep flat on your back for long periods.',
    titleBangla: 'অনেকক্ষণ চিত হয়ে ঘুমাবেন না।',
    description: 'Sleeping flat on your back can reduce blood flow. Try to sleep on your side.',
    descriptionBangla: 'চিত হয়ে ঘুমালে রক্ত প্রবাহ কমতে পারে। পাশ ফিরে ঘুমানোর চেষ্টা করুন।'
  },
  {
    icon: '🦶',
    title: 'Don\'t ignore sudden swelling of face, hands, or feet.',
    titleBangla: 'হঠাৎ মুখ, হাত বা পায়ে ফোলা দেখলে অবহেলা করবেন না।',
    description: 'Sudden swelling can be a danger sign. See a health worker immediately.',
    descriptionBangla: 'হঠাৎ ফোলা একটি বিপদ সংকেত হতে পারে। অবিলম্বে স্বাস্থ্যকর্মী দেখান।'
  }
];

const thirdTrimesterDos = [
  {
    icon: '📅',
    title: 'Go for all your ANC check-ups in this stage.',
    titleBangla: 'এই সময়ে সব ANC চেক-আপ নিয়মিত করুন।',
    description: 'Check-ups become more frequent now. Don\'t miss any as delivery time is near.',
    descriptionBangla: 'এখন চেক-আপ আরও ঘন ঘন হয়। প্রসবের সময় কাছে তাই কোনোটি মিস করবেন না।'
  },
  {
    icon: '👶',
    title: 'Pay attention to your baby\'s kicks every day.',
    titleBangla: 'প্রতিদিন বাচ্চার নড়াচড়া/কিক ঠিকমতো হচ্ছে কি না লক্ষ্য করুন।',
    description: 'You should feel regular movements. If movements reduce a lot, go to the clinic.',
    descriptionBangla: 'আপনার নিয়মিত নড়াচড়া অনুভব করা উচিত। নড়াচড়া অনেক কমে গেলে ক্লিনিকে যান।'
  },
  {
    icon: '😴',
    title: 'Sleep on your left side as much as you can.',
    titleBangla: 'যতটা সম্ভব বাম পাশে কাত হয়ে ঘুমান।',
    description: 'Left side sleeping is best for blood flow to baby in the final weeks.',
    descriptionBangla: 'শেষ সপ্তাহগুলিতে শিশুর রক্ত প্রবাহের জন্য বাম পাশে ঘুমানো সেরা।'
  },
  {
    icon: '🎒',
    title: 'Keep a small bag ready for delivery (clothes, documents, etc.).',
    titleBangla: 'প্রসূতি কেন্দ্র/হাসপাতালে যাওয়ার জন্য আগে থেকেই একটি ব্যাগ প্রস্তুত রাখুন (কাপড়, কাগজপত্র ইত্যাদি)।',
    description: 'Pack clothes, documents, and other items you\'ll need at the hospital.',
    descriptionBangla: 'হাসপাতালে প্রয়োজন হবে এমন পোশাক, কাগজপত্র এবং অন্যান্য জিনিস প্যাক করুন।'
  },
  {
    icon: '🚑',
    title: 'Plan how you will reach a clinic when labour starts.',
    titleBangla: 'প্রসব ব্যথা শুরু হলে কীভাবে ক্লিনিক/হাসপাতালে যাবেন, আগে থেকেই পরিকল্পনা করুন।',
    description: 'Know how to get to the hospital. Arrange transport ahead of time.',
    descriptionBangla: 'কীভাবে হাসপাতালে যাবেন তা জানুন। আগে থেকেই পরিবহনের ব্যবস্থা করুন।'
  },
  {
    icon: '⚠️',
    title: 'Learn danger signs: heavy bleeding, no movements, severe headache.',
    titleBangla: 'বিপদসংকেতগুলো চিনে নিন: বেশি রক্তপাত, বাচ্চার নড়াচড়া বন্ধ, তীব্র মাথা ব্যথা ইত্যাদি।',
    description: 'Know the warning signs so you can get help quickly if needed.',
    descriptionBangla: 'সতর্কতা লক্ষণগুলো জানুন যাতে প্রয়োজনে দ্রুত সাহায্য পেতে পারেন।'
  },
  {
    icon: '📞',
    title: 'Save phone numbers of clinic, ambulance, and a trusted person.',
    titleBangla: 'ক্লিনিক, অ্যাম্বুলেন্স ও বিশ্বাসযোগ্য আত্মীয়/পরিচিতের ফোন নম্বর কাছে রাখুন।',
    description: 'Keep important phone numbers saved and easy to access.',
    descriptionBangla: 'গুরুত্বপূর্ণ ফোন নম্বরগুলি সংরক্ষিত এবং সহজে অ্যাক্সেসযোগ্য রাখুন।'
  },
  {
    icon: '🍽️',
    title: 'Keep eating good food and drinking clean water.',
    titleBangla: 'ভালো খাবার ও পরিষ্কার পানি গ্রহণ চালিয়ে যান।',
    description: 'Continue eating nutritious food and drinking clean water right until delivery.',
    descriptionBangla: 'প্রসব পর্যন্ত পুষ্টিকর খাবার এবং পরিষ্কার পানি পান করা চালিয়ে যান।'
  }
];

const thirdTrimesterDonts = [
  {
    icon: '👶',
    title: 'Don\'t ignore if your baby moves much less than usual.',
    titleBangla: 'বাচ্চার নড়াচড়া আগের চেয়ে অনেক কম হলে অবহেলা করবেন না।',
    description: 'Reduced baby movements can be a sign of problem. Go to the clinic immediately.',
    descriptionBangla: 'শিশুর নড়াচড়া কমে যাওয়া সমস্যার লক্ষণ হতে পারে। অবিলম্বে ক্লিনিকে যান।'
  },
  {
    icon: '🩸',
    title: 'If you have heavy bleeding or water breaks, don\'t wait at home.',
    titleBangla: 'হঠাৎ বেশি রক্তপাত বা পানি ভেঙে গেলে বাড়িতে বসে থাকবেন না।',
    description: 'Heavy bleeding or water breaking means you need to go to hospital right away.',
    descriptionBangla: 'বেশি রক্তপাত বা পানি ভাঙা মানে আপনাকে এখনই হাসপাতালে যেতে হবে।'
  },
  {
    icon: '🚌',
    title: 'Avoid long or bumpy travel near your due date.',
    titleBangla: 'প্রসবের সম্ভাব্য তারিখের কাছাকাছি দীর্ঘ বা ঝাঁকুনিপূর্ণ ভ্রমণ এড়িয়ে চলুন।',
    description: 'Long travel can be risky when you\'re close to delivery. Stay near a health facility.',
    descriptionBangla: 'প্রসবের কাছাকাছি সময়ে দীর্ঘ ভ্রমণ ঝুঁকিপূর্ণ হতে পারে। স্বাস্থ্য সুবিধার কাছাকাছি থাকুন।'
  },
  {
    icon: '🏠',
    title: 'Don\'t stay alone at home when your delivery date is near.',
    titleBangla: 'প্রসবের তারিখ কাছে এলে একা বাড়িতে থাকবেন না।',
    description: 'Make sure someone is with you as labour can start anytime.',
    descriptionBangla: 'নিশ্চিত করুন যে কেউ আপনার সাথে আছে কারণ প্রসব যেকোনো সময় শুরু হতে পারে।'
  },
  {
    icon: '🧹',
    title: 'Avoid very heavy household work (like lifting buckets, big loads).',
    titleBangla: 'ভারী ঘরের কাজ (বালতি তোলা, ভারী জিনিস সরানো) এড়িয়ে চলুন।',
    description: 'Heavy work can start labour early or hurt you. Ask for help with heavy tasks.',
    descriptionBangla: 'ভারী কাজ তাড়াতাড়ি প্রসব শুরু করতে পারে বা আপনাকে আঘাত করতে পারে। ভারী কাজে সাহায্য চান।'
  },
  {
    icon: '💊',
    title: 'Don\'t take any new medicine or herbal remedy without doctor\'s advice.',
    titleBangla: 'ডাক্তারের পরামর্শ ছাড়া নতুন কোনো ওষুধ বা ভেষজ চিকিৎসা শুরু করবেন না।',
    description: 'Some medicines or herbs can trigger early labour or harm the baby.',
    descriptionBangla: 'কিছু ওষুধ বা ভেষজ তাড়াতাড়ি প্রসব শুরু করতে পারে বা শিশুর ক্ষতি করতে পারে।'
  },
  {
    icon: '🤕',
    title: 'Don\'t ignore severe headache, blurred vision, or swelling of face.',
    titleBangla: 'তীব্র মাথা ব্যথা, চোখ ঝাপসা দেখা বা মুখ ফোলা হলে অবহেলা করবেন না।',
    description: 'These are danger signs of a serious condition. Get medical help immediately.',
    descriptionBangla: 'এগুলি একটি গুরুতর অবস্থার বিপদ সংকেত। অবিলম্বে চিকিৎসা সাহায্য নিন।'
  },
  {
    icon: '🛏️',
    title: 'Avoid sleeping completely flat on your back.',
    titleBangla: 'চিৎ হয়ে সম্পূর্ণ সোজা হয়ে বেশি সময় ঘুমাবেন না।',
    description: 'Flat on back can reduce blood flow to baby. Sleep on your left side instead.',
    descriptionBangla: 'পিঠে সম্পূর্ণ সমতল শিশুর রক্ত প্রবাহ কমাতে পারে। পরিবর্তে আপনার বাম পাশে ঘুমান।'
  }
];

export default function DosAndDontsCarousel({ trimester = 1, onClose }) {
  const [tab, setTab] = useState('do');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(null);

  const getDosAndDonts = () => {
    if (trimester === 2) {
      return tab === 'do' ? secondTrimesterDos : secondTrimesterDonts;
    } else if (trimester === 3) {
      return tab === 'do' ? thirdTrimesterDos : thirdTrimesterDonts;
    } else {
      return tab === 'do' ? firstTrimesterDos : firstTrimesterDonts;
    }
  };
  
  const items = getDosAndDonts();
  const currentItem = items[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onClose} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">Trimester {trimester} Guide</h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex p-2 bg-gray-100 mx-4 mt-4 rounded-2xl">
        <button
          onClick={() => { setTab('do'); setCurrentIndex(0); }}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            tab === 'do' 
              ? 'bg-emerald-500 text-white shadow-lg' 
              : 'text-gray-600'
          }`}
        >
          <span className="text-lg">✓</span>
          Do This
        </button>
        <button
          onClick={() => { setTab('dont'); setCurrentIndex(0); }}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            tab === 'dont' 
              ? 'bg-rose-500 text-white shadow-lg' 
              : 'text-gray-600'
          }`}
        >
          <span className="text-lg">✗</span>
          Avoid This
        </button>
      </div>

      {/* Card Carousel */}
      <div className="px-4 mt-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex 
                  ? (tab === 'do' ? 'bg-emerald-500 w-6' : 'bg-rose-500 w-6')
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`rounded-3xl p-6 shadow-lg ${
                tab === 'do' 
                  ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200' 
                  : 'bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200'
              }`}
              onClick={() => setShowDetail(currentItem)}
            >
              {/* Badge */}
              <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md ${
                tab === 'do' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}>
                {tab === 'do' ? '✓' : '✗'}
              </div>

              {/* Icon */}
              <div className="text-6xl text-center mb-4">{currentItem.icon}</div>

              {/* Title - English */}
              <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
                {currentItem.title}
              </h2>
              
              {/* Title - Bangla */}
              <h2 className="text-xl font-bold text-gray-700 text-center mb-3" style={{ fontFamily: 'system-ui' }}>
                {currentItem.titleBangla}
              </h2>

              {/* Listen button */}
              <button className="flex items-center gap-2 mx-auto text-gray-500 bg-white/60 px-4 py-2 rounded-full">
                <Volume2 className="w-4 h-4" />
                <span className="text-sm">Tap to learn more</span>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Card count */}
        <p className="text-center text-gray-500 mt-4">
          {currentIndex + 1} of {items.length}
        </p>

        {/* Swipe hint */}
        <p className="text-center text-gray-400 text-sm mt-2">
          ← Swipe or tap arrows to see more →
        </p>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowDetail(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full rounded-t-3xl p-6 pb-10 ${
                tab === 'do' ? 'bg-emerald-50' : 'bg-rose-50'
              }`}
            >
              <button 
                onClick={() => setShowDetail(null)}
                className="absolute top-4 right-4 p-2"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <div className="text-5xl text-center mb-4">{showDetail.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-1">
                {showDetail.title}
              </h3>
              <h3 className="text-2xl font-bold text-gray-700 text-center mb-4" style={{ fontFamily: 'system-ui' }}>
                {showDetail.titleBangla}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-2">
                {showDetail.description}
              </p>
              <p className="text-gray-700 text-center text-lg leading-relaxed mb-6" style={{ fontFamily: 'system-ui' }}>
                {showDetail.descriptionBangla}
              </p>

              <button className={`w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 ${
                tab === 'do' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}>
                <Volume2 className="w-5 h-5" />
                Listen to this
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}