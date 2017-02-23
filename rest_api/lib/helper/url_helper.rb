class UrlHelper

  def self.buildUrl(lng,url_article,url_page,url_parent,url_parent_parent)
      url =""
      url +=lng

      if(!url_parent_parent.nil? && !url_parent_parent.blank?)
        url +="/"+url_parent_parent
      end
      if(!url_parent.nil? && !url_parent.blank?)
        url +="/"+url_parent
      end
      if(!url_page.nil? && !url_page.blank?)
        url +="/"+url_page
      end
       if(!url_article.nil? && !url_article.blank?)
        url +="/"+url_article
       end
      return url
      #url =  lng+"/"+url_parent+"/"+url_page+"/"+url_article
      #else
       # url =  lng+"/"+url_parent_parent+"/"+url_parent+"/"+url_page+"/"+url_article
  end
end