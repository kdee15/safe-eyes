<template>
  <section ref="component" class="o-component-image-content">
    <div class="container o-block-title">
      <div class="row">
        <h2 class="col a-block-title">{{ component.fields.title }}</h2>
      </div>
      <div class="row">
        <figure class="o-block-image col-12 col-md-5">
          <img
              :src="component.fields.image.fields.file.url"
              alt="Your alt text here"
              class="a-image"
              :width="component.fields.image.fields.file.details.image.width"
              :height="component.fields.image.fields.file.details.image.height" />
        </figure>
        <div class="o-block-media col-12 col-md-6 offset-md-1">
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

export default {

  props: ['component'],

  computed: {
    content() {

      const url = component.fields.image.fields.file.url;
      const width = component.fields.image.fields.file.details.image.width;
      const height = component.fields.image.fields.file.details.image.height;

      const siteBaseURL = process.env.SITE_BASE_URL;

      const options = {
        renderNode: {
          [INLINES.HYPERLINK]: (node, next) => {
            return `<a href="${node.data.uri}"${
                node.data.uri.startsWith(siteBaseURL) ? "" : ' target="_blank"'
            }>${next(node.content)}</a>`;
          },
          [BLOCKS.PARAGRAPH]: (node, next) => {
            return `<p class="a-body-copy">${next(node.content)}</p>`;
          },
        },
      };
      const rawRichTextField = this.component.fields.content;
      return documentToHtmlString(rawRichTextField, options);
    }
  }

}

</script>

<style lang="scss" scoped>

// BLOCK STYLE ++++++++++++++++++++++++++++++++++++++++++++

.o-component-image-content { padding: 80px 0 50px; background-color: pink;

  // A.1. GLOBAL STYLE ------------------------------------

  h2 { color: white; text-shadow: 0 0 5px black; align-self: center; text-align: center; width: 100%; margin-bottom: 30px; }

  .o-block-image {
    img { max-width: 100%; height: auto; }
  }

  // A.1. END ---------------------------------------------

  // B. MEDIA QUERIES -------------------------------------

  // B.1. GRACEFUL DEGRADATION -------------

  // B.1. END ------------------------------

  // B.2. PROGRESSIVE ENHANCEMENT ----------
  // 768px up
  @media ($sm-up) {}

  // 991px up
  @media ($md-up) {}

  // 1200px up
  @media ($lg-up) {}

  // 1440px up
  @media ($xlg-up) {}

  // B.2. END ------------------------------

  // B. END -----------------------------------------------

}

// END: BLOCK STYLE +++++++++++++++++++++++++++++++++++++++

</style>
