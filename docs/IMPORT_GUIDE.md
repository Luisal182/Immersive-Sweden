# How to Import Data from Excel to Supabase
### Step-by-step guide — Immersive Sweden Database

---

## Overview

This guide explains how to add multiple organizations to the database at once using an Excel file. This is useful when you have a list of new organizations ready in a spreadsheet and want to avoid adding them one by one through the dashboard.

The process has three steps:
1. Prepare your Excel file
2. Export it as CSV
3. Import it into Supabase

---

## ⚠️ Important — Read before you start

The Immersive Sweden database currently has 450+ organizations and a large number of columns. Before importing, please be aware of the following:

- **Test first with a small batch.** Always start with 5-10 rows to verify that your columns are mapped correctly before importing the full file.
- **Column names must match exactly.** With many columns it is easy to have a small mismatch (wrong case, space instead of underscore). One wrong column name can cause the entire import to fail.
- **One error can cancel the whole import.** If a single row has an invalid value (for example, text in a number field), Supabase may reject the entire file.
- **Split large imports into batches.** For files with 100+ rows, split into batches of 50-100 rows. Import one batch, verify it worked in the dashboard, then continue with the next.
- **Always keep a backup.** Before importing, save a copy of your Excel file. Once data is in the database it can be edited but not automatically undone.
- **Swedish characters.** Always export as CSV UTF-8 to avoid issues with å, ä, ö.

---

## Step 1 — Prepare your Excel file

Your Excel file must have **column headers in the first row** that match exactly the column names in the database.

The columns used in the current prototype are:

| Column name | Description | Example |
|-------------|-------------|---------|
| name | Organization name | Axis Communications AB |
| city | City in Sweden | Lund |
| technology | XR, AI or Visualization | XR |
| industry | Manufacturing, Healthcare, Culture or Games | Healthcare |
| organization_model | Business or Nonprofit Organization | Business |
| email | Contact email | info@example.se |
| website | Website URL | https://example.se |
| latitude | GPS latitude | 55.7045 |
| longitude | GPS longitude | 13.1912 |

**Important rules:**
- Column names must be in **lowercase with underscores** (e.g. `organization_model`, not `Organization Model`)
- Leave cells empty if you don't have the value — they will be saved as null
- Do not include the `id` column — Supabase generates it automatically

> **OBS!** Text values like technology and industry must match **exactly** (case sensitive) with the values defined in the database and used in the application. For example: `XR` not `xr`, `Nonprofit Organization` not `nonprofit organization`. A mismatch means the filters on the map will not work correctly for that organization.

---

### ⚠️ A note on data quality — from experience

Building the original database required significant manual research. Many organizations had missing information — no email, no coordinates, no clear industry category. This meant that before each batch import, every row had to be individually researched, verified, and completed — both manually and with the help of AI tools.

**This is not a quick process.** Before importing a batch, make sure each row is as complete as possible, especially:
- **Latitude and longitude** — without these the organization will not appear on the map. These often need to be looked up manually via Google Maps or a geocoding tool.
- **Technology and industry values** — these need to match exactly as described above.
- **Name spelling** — verify the official company name to avoid duplicates.

Rushing this step will result in incomplete data in the database that is hard to fix later at scale.

---

## Step 2 — Export as CSV

1. Open your Excel file
2. Click **File → Save As**
3. Choose file format: **CSV UTF-8 (Comma delimited) (.csv)**
4. Save the file

> ⚠️ Make sure you choose **UTF-8** encoding to avoid issues with Swedish characters (å, ä, ö)

---

## Step 3 — Import into Supabase

1. Go to [supabase.com](https://supabase.com) and log in with the organization account
2. Select the **Immersive Sweden** project
3. In the left menu, click **Table Editor**
4. Click on the **organizations** table
5. Click the **Insert** button at the top right
6. Select **Import data from CSV**
7. Upload your CSV file
8. Supabase will show a preview — verify the columns are mapped correctly
9. Click **Import**

---

## After importing

- Go to the **Admin Dashboard** at `/dashboard` to verify the new organizations appear correctly
- Check that the map at the main page shows the new markers (organizations with valid latitude and longitude will appear automatically)
- If any organization is missing coordinates, you can add them manually through the Edit button in the dashboard

---

## Common issues

**Swedish characters look wrong (å, ä, ö)**
Make sure you saved the CSV as UTF-8 in Step 2.

**Columns not matching**
Check that your Excel headers match exactly the database column names (lowercase, underscores).

**Organization appears in dashboard but not on map**
The organization is missing latitude and longitude. Open the Edit drawer in the dashboard and add the coordinates manually.

**Import fails completely**
Check that there are no empty rows at the bottom of your Excel file, and that the first row contains only column headers.

---

## Need help?

If you run into issues, the most reliable way is to add organizations one by one through the Admin Dashboard at `/dashboard` using the **Add Organization** button.