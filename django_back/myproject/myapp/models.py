from django.db import models

class Page(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # Assuming 'images' field is a ManyToManyField
    images = models.ManyToManyField('Image', related_name='pages')

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    page = models.ForeignKey(Page, related_name='page_images', on_delete=models.CASCADE)