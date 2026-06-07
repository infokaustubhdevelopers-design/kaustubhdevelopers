# Hostinger Deployment Guide

This guide details the step-by-step process of deploying the frontend application to Hostinger shared hosting or VPS. Since the backend of this application is fully serverless (powered by Google Sheets Apps Script Web App), the frontend builds into standard static files (HTML, CSS, JS) that can be served directly by Apache/Nginx.

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Step 1: Set Environment Variables](#step-1-set-environment-variables)
3. [Step 2: Build and Package the Application](#step-2-build-and-package-the-application)
4. [Step 3: Upload to Hostinger](#step-3-upload-to-hostinger)
5. [Step 4: Verify Routing and Submission](#step-4-verify-routing-and-submission)

---

## 1. Prerequisites
- **Node.js** (v18 or higher) installed locally.
- A **Hostinger Hosting Account** (Shared Hosting, Cloud Hosting, or VPS).
- Access to Hostinger **File Manager** or **FTP Client** (like FileZilla).
- Your **Google Sheets Apps Script Web App URL** (if you need to update it).

---

## Step 1: Set Environment Variables
Before compiling the project, you must set the environment variables. Because this is a static site, Vite compiles and embeds these values directly into the built JavaScript files at build time.

1. Open the file [frontend/.env](file:///Users/giteshgoyal/Desktop/Kaustubh-Developers-beta/frontend/.env).
2. Set the `VITE_GOOGLE_SHEET_WEBAPP_URL` variable to your Google Sheets Web App URL:
   ```env
   VITE_GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/.../exec
   ```
3. Save the file.

---

## Step 2: Build and Package the Application
We have configured a helper command that automates the building and packaging process.

1. Open your terminal at the root of the project.
2. Run the following command:
   ```bash
   npm run package
   ```
3. This command will:
   - Compile all JavaScript, CSS, and asset files.
   - Bundle them under the `frontend/dist/public` folder.
   - Include the `.htaccess` file (which enables SPA routing).
   - Package all compiled files into a single archive file named `deploy.zip` in the project root.

---

## Step 3: Upload to Hostinger

### Option A: Using Hostinger File Manager (Recommended & Easiest)
1. Log in to your **Hostinger hPanel**.
2. Go to **Websites** and click **Manage** next to your domain.
3. Under **Files**, open the **File Manager**.
4. Navigate to the **`public_html`** folder (this is the root directory of your website).
   - *Note: If you are hosting in a subdirectory (e.g., `yoursite.com/portal/`), navigate to that subdirectory instead.*
5. Drag and drop the generated `deploy.zip` file (found at the root of this project) directly into the File Manager.
6. Right-click on `deploy.zip` and select **Extract**.
7. Choose the current folder (`public_html`) for extraction.
8. Once extracted, you should see the following structure inside your directory:
   - `assets/` (folder containing bundled JS, CSS, images, and videos)
   - `.htaccess` (Apache routing rules file)
   - `index.html` (Main entry point)
   - `robots.txt`
   - `favicon.svg`
   - `opengraph.jpg`
9. Delete the uploaded `deploy.zip` file to keep the server clean.

### Option B: Using FTP (FileZilla)
1. Extract the `deploy.zip` file locally.
2. Connect to your Hostinger server using your FTP credentials.
3. Upload all files from the extracted folder into the `public_html` directory of your server.

### Option C: Automated Deployment via GitHub Actions (Recommended)
If your code is hosted in a GitHub repository, you can configure GitHub Actions to build and deploy your site automatically every time you push code to the `main` branch.

1. **Get FTP Credentials from Hostinger**:
   - Log in to your Hostinger hPanel.
   - Go to **Websites** -> **Manage** -> **Files** -> **FTP Accounts**.
   - Note down the **FTP Host**, **FTP Username**, and reset/set the **FTP Password**.

2. **Add Secrets to GitHub Repository**:
   - Go to your GitHub repository on github.com.
   - Click on **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**.
   - Add the following secrets:
     * `FTP_SERVER`: (Your FTP Host/IP Address, e.g., `ftp.kaustubhdevelopers.in`)
     * `FTP_USERNAME`: (Your Hostinger FTP Username)
     * `FTP_PASSWORD`: (Your FTP Password)
     * `VITE_GOOGLE_SHEET_WEBAPP_URL`: (Your Google Sheets App Web App URL, e.g., `https://script.google.com/...`)

3. **Deploy**:
   - We have already created the workflow configuration file under [`.github/workflows/deploy.yml`](file:///Users/giteshgoyal/Desktop/Kaustubh-Developers-beta/.github/workflows/deploy.yml).
   - Once you commit and push this code to GitHub, the build pipeline will run automatically.
   - The action will build the project and sync **only changed files** to Hostinger. This means future builds will deploy in seconds and will not waste bandwidth re-uploading the 45MB video unless the video itself is changed.

---

## Step 4: Verify Routing and Submission

### Client-side Routing Check
We have included a `.htaccess` file in the build output. This file tells Apache to route all pages to `index.html` if the requested file doesn't exist.
- Visit your website (e.g., `https://yourdomain.com`).
- Navigate to pages like `/services` or `/portfolio`.
- **Refresh the page**. If the page loads successfully without a "404 Not Found" error, the `.htaccess` configuration is working perfectly.

### Contact Form Submission
- Navigate to the **Contact** section.
- Fill out the form and submit it.
- Ensure the toast notification confirms submission and that the data appears in your linked Google Sheet.
