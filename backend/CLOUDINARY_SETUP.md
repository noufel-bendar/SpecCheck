# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image storage in your Django project to prevent image loss during deployments.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. No credit card required for the free tier
3. After signing up, you'll get your credentials from the Dashboard

## Step 2: Get Your Cloudinary Credentials

1. Log in to your Cloudinary Dashboard
2. Go to the "Dashboard" section
3. Copy the following values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Step 3: Set Environment Variables

### For Local Development:
Create a `.env` file in your backend directory with:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### For Production (Render):
Add these environment variables in your Render dashboard:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Step 4: Install Dependencies

The required packages are already added to `requirements.txt`:
- `django-cloudinary-storage==0.3.0`
- `cloudinary==1.36.0`

Install them with:
```bash
pip install -r requirements.txt
```

## Step 5: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Step 6: Migrate Existing Images (Optional)

If you have existing images in your local media folder, migrate them to Cloudinary:

```bash
# Create backup and migrate
python manage.py migrate_to_cloudinary --backup

# Or migrate without backup
python manage.py migrate_to_cloudinary

# To delete local files after migration (optional)
python manage.py migrate_to_cloudinary --delete-local
```

## Step 7: Test the Setup

1. Start your Django server: `python manage.py runserver`
2. Go to Django admin and try uploading a new image
3. Check that the image URL points to Cloudinary (should contain `cloudinary.com`)

## Step 8: Deploy to Production

1. Make sure all environment variables are set in your hosting platform
2. Deploy your application
3. Images will now be stored in Cloudinary and won't be lost on redeploy

## Troubleshooting

### Images not uploading to Cloudinary
- Check that all Cloudinary environment variables are set correctly
- Verify your Cloudinary credentials are valid
- Check the Django logs for any error messages

### Images not displaying in frontend
- Ensure the serializer is correctly handling Cloudinary URLs
- Check that the `PUBLIC_BASE_URL` environment variable is set correctly
- Verify CORS settings allow your frontend domain

### Migration errors
- Make sure you have a backup of your local images before migration
- Check that all Cloudinary credentials are set before running migration
- Review the migration logs for specific error messages

## Benefits of This Setup

1. **No Image Loss**: Images are stored in the cloud and persist across deployments
2. **Better Performance**: Cloudinary provides CDN and optimization
3. **Scalability**: No storage limits on your server
4. **Free Tier**: 25GB storage and 25GB bandwidth per month
5. **Image Transformations**: Built-in image resizing, cropping, and optimization

## File Structure Changes

The following files have been modified:
- `settings.py`: Added Cloudinary configuration
- `store/models.py`: Changed ImageField to CloudinaryField
- `store/serializers.py`: Updated to handle Cloudinary URLs
- `requirements.txt`: Added Cloudinary packages
- `store/management/commands/migrate_to_cloudinary.py`: Migration command

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Yes |
| `PUBLIC_BASE_URL` | Your deployed app URL | Yes (for production) |
