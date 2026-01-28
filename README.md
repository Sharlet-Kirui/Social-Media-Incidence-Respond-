# React + Vite
# Cloning & Running a React Project

![React](https://img.shields.io/badge/React-18.x-blue)
![Node](https://img.shields.io/badge/Node.js-Required-green)
![Git](https://img.shields.io/badge/Git-Version%20Control-orange)
![Beginner Friendly](https://img.shields.io/badge/Level-Beginner-brightgreen)

This README is written **specifically for beginners**. If this is your first time using **VS Code, Git, GitHub, Node.js, or React**, follow the steps **one by one** and you’ll be able to run the project successfully.

---

## 📌 What You Need Before Starting

You will install the following tools:

1. ![VS Code](https://img.shields.io/badge/VS%20Code-Editor-007ACC?logo=visualstudiocode&logoColor=white)
 **Visual Studio Code (VS Code)** – Code editor
2. ![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white) **Node.js** – Needed to run React
3. ![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white) **Git** – To clone the project & manage branches
4. **A GitHub account** – To access the repository

---

## 🧩 Step 1: Install Visual Studio Code (VS Code)

### 🔹 What is VS Code?

VS Code is a free code editor where you will write and run your code.

### 🔹 How to Install

1. Open your browser
2. Go to 👉 [https://code.visualstudio.com/](https://code.visualstudio.com/)
3. Download for **Windows / macOS / Linux**
4. Install using default settings

### 🔹 Recommended VS Code Extensions

Open VS Code → Click **Extensions icon (left sidebar)** → Search and install:

* ![ES7+ React Snippets](https://img.shields.io/badge/ES7%2B-React%20Snippets-61DAFB?logo=react&logoColor=black) **ES7+ React/Redux Snippets** – React shortcuts
* ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black) **Prettier** – Code formatting
* ![Auto Rename Tag](https://img.shields.io/badge/Auto%20Rename-Tag-38B2AC?logo=html5&logoColor=white) **Auto Rename Tag** – Renames HTML/JSX tags
* ![GitLens](https://img.shields.io/badge/GitLens-007ACC?logo=visualstudiocode&logoColor=white) **GitLens** – Better Git visibility
* ![Bracket Pair Colorizer](https://img.shields.io/badge/Bracket%20Pair-Colorizer-8A2BE2) **Bracket Pair Colorizer** – Easier to read brackets

---

## 🟢 Step 2: Install Node.js

### 🔹 What is Node.js?

Node.js allows you to install packages and run React projects.

### 🔹 How to Install

1. Go to 👉 [https://nodejs.org/](https://nodejs.org/)
2. Download **LTS (Recommended)**
3. Install with default settings

### 🔹 Confirm Installation

Open **Command Prompt / Terminal** and run:

```bash
node -v
npm -v
```

If versions appear, Node is installed correctly ✅

---

## 🔧 Step 3: Install Git

### 🔹 What is Git?

Git is used to manage project versions and collaborate with others.

### 🔹 How to Install

1. Go to 👉 [https://git-scm.com/](https://git-scm.com/)
2. Download Git
3. Install using default options

### 🔹 Confirm Installation

    git --version


---

## 🌐 Step 4: Clone the Project from GitHub

### 🔹 What Does “Clone” Mean?

Cloning means copying the project from GitHub to your computer.

### 🔹 Steps

1. Open the project repository on GitHub
2. Click **Code** → Copy the HTTPS or SSH link
3. Open VS Code
4. Open **Terminal** (Ctrl + `)
5. Run:

Example:

```bash
HTTPS

git clone https://github.com/Sharlet-Kirui/Social-Media-Incidence-Respond-.git

SSH

git@github.com:Sharlet-Kirui/Social-Media-Incidence-Respond-.git

```

6. Navigate into the project folder:

```bash
cd Social-Media-Incidence-Respond
```

---

## 📦 Step 5: Install Node Packages (Dependencies)

### 🔹 Why This Is Important

React projects depend on many libraries. They are listed in `package.json`.

### 🔹 Install Dependencies

```bash
npm install
```

⏳ This may take a few minutes.

If `node_modules` folder appears → Success ✅

---

## ▶️ Step 6: Run the React Project

```bash
npm start
```

or (for Vite projects):

```bash
npm run dev
```

The browser should open automatically at:

👉 [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173)

---

## 🌱 Step 7: Understanding Git Branches (Very Important)

### 🔹 What is a Branch?

A branch allows each group member to work **independently** without affecting others.

Each group member has their **own branch**.

---

## 🌿 Step 8: View All Available Branches

```bash
git branch
```

To see **remote branches**:

```bash
git branch -a
```

---

## 🔄 Step 9: Switch to Your Branch

```bash
git checkout branch-name
```

Example:

```bash
git checkout shuaib
```

If the branch exists remotely but not locally:

```bash
git checkout -b shuaib origin/shuaib
```

---

## 💾 Step 10: Save Your Work (Commit & Push)

### 🔹 Check Changes

```bash
git status
```

### 🔹 Add Changes

```bash
git add .
```

### 🔹 Commit Changes

```bash
git commit -m "Your clear commit message"
```

### 🔹 Push to Your Branch

```bash
git push origin branch-name 

Example 
git push --set-upstream origin Shaban
```

###  Pulling Changes From A Branch
```bash
git pull
```

### Pulling Changes from a specific branch
```bash
git pull origin main
```

---

## ⚠️ Important Rules for Group Work

✅ Always work on **your own branch**
❌ Never push directly to `main`
✅ Pull latest changes before working:

```bash
git pull origin main
```

---

## 🆘 Common Errors & Fixes

### ❌ `npm not recognized`

➡ Node.js is not installed or restart your terminal

### ❌ `git checkout branch` error

➡ Run `git branch -a` to confirm branch name

### ❌ App not starting

➡ Run `npm install` again

---

## 🎯 Final Notes for Beginners

* Don’t panic when errors appear — Google & logs help
* Commit often with clear messages
* Ask teammates before merging
* Practice Git daily — it gets easier fast 💪

---

✨ Happy Coding & Collaboration!

## Contributors
* Sharlet
* Sol
* Mary
* Gabriel
* Shuaib
* James
* Victory
* Clemmentine




