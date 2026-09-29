# رفع SpaceShield إلى GitHub

هذه الحزمة تحتوي على ملفات المشروع البرمجية كاملة، مع استبعاد `node_modules` و`dist` و`.git` لأنها ملفات مولّدة أو محلية.

## 1. فك الضغط

فك ضغط ملف `SpaceShield-source.zip` في مجلد باسم `spaceshield`.

## 2. إنشاء مستودع GitHub

من GitHub أنشئ Repository جديداً وفارغاً باسم مثل:

```text
spaceshield
```

لا تضف README أو `.gitignore` من GitHub لأن المشروع يحتوي عليهما بالفعل.

## 3. رفع الملفات من Terminal

افتح Terminal داخل مجلد المشروع ثم نفّذ:

```bash
git init
git add .
git commit -m "Initial SpaceShield project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/spaceshield.git
git push -u origin main
```

استبدل `YOUR_USERNAME` باسم حسابك في GitHub.

## 4. تشغيل المشروع محلياً

يتطلب Node.js وpnpm:

```bash
pnpm install
pnpm dev:static
```

ثم افتح:

```text
http://localhost:3000
```

## 5. تعديل بيانات الطالب

افتح الملف:

```text
client/src/App.tsx
```

وعدّل الحقول الموجودة في قسم `studentDetails` مثل الاسم والكلية والتفاصيل الأكاديمية.

الخريطة التفاعلية موجودة في:

```text
client/src/components/SatelliteCybersecurityMap.tsx
```

المشروع يستخدم بيانات اصطناعية فقط ولا يتصل بأقمار صناعية أو أنظمة حقيقية.
