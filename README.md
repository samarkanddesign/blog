# Blog

The blog for Samarkand Design: https://blog.samarkanddesign.com/

Uses Hugo to generate static pages that can be deployed anywhere.

## Requirements

Hugo (for site generation)
Node/NPM (For image processing, if desired)

## Usage

Edit the markdown files and generate the site by running `hugo`.

Usually content would be added/edited using http://forestry.io which provides a nice frontend to editing the markdown.

## Image Processing

If adding images to posts they can often be quite large. There is a handy script that will look at all the images and resize them if they're too big. It'll leave smaller ones alone.

You'll need to install the node dependencies with `yarn install` then `yarn process-images` to run the script.

