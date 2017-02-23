class MetaHelper

  def self.buildMeta(title, content, lng, url_rubrique,url, url_canonical, image, type)

    metas ={}

    metas['title'] = title
    metas['meta_description'] = ActionView::Base.full_sanitizer.sanitize(HTML_Truncator.truncate(content, 170, :length_in_chars => true)).squish
    metas['rel-author'] = GOOGLE_PLUS_AUTHOR
    metas['rel-canonical'] = URL_PATH+'/'+lng+((url_canonical.blank?)?'' :('/'+url_rubrique))+((url.blank?)? '': '/'+url)
    #opengraph
    metas['opengraph'] ={}
    metas['opengraph']['og:title'] =title
    metas['opengraph']['og:type'] = type
    metas['opengraph']['og:image'] = URL_PATH+'/'+image
    metas['opengraph']['og:url'] = URL_PATH+'/'+lng+((url_rubrique.blank?)?'' :('/'+url_rubrique)) + ((url.blank?)? '': '/'+url)
    metas['opengraph']['og:description'] = ActionView::Base.full_sanitizer.sanitize(HTML_Truncator.truncate(content, 290, :length_in_chars => true)).squish
    #twitter
    metas['twitter:card'] ={}
    metas['twitter:card']['twitter:card'] = 'summary'
    metas['twitter:card']['twitter:url'] = URL_PATH+'/'+lng+((url_rubrique.blank?)?'' :('/'+url_rubrique)) + ((url.blank?)? '': '/'+url)
    metas['twitter:card']['twitter:title'] = title
    metas['twitter:card']['twitter:description'] = ActionView::Base.full_sanitizer.sanitize(HTML_Truncator.truncate(content, 190, :length_in_chars => true)).squish
    metas['twitter:card']['twitter:image'] = URL_PATH+'/'+image
    #schema.org
    metas['schema'] ={}
    metas['schema']['Itemscope'] = (type=='article')? 'http://schema.org/Article' : ''
    metas['schema']['itemprop'] = {}
    metas['schema']['itemprop']['name'] = title
    metas['schema']['itemprop']['image'] =  URL_PATH+'/'+image
    metas['schema']['itemprop']['description'] = ActionView::Base.full_sanitizer.sanitize(HTML_Truncator.truncate(content, 190, :length_in_chars => true)).squish
    return metas
  end

end