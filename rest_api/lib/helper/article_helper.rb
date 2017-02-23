class ArticleHelper

  def self.getIdPagesForHistory(id_page)

    list_id_page = []
    if !id_page.nil?
      if id_page == '5'
        list_id_page = [5,1703]
      elsif id_page == '23'
        list_id_page = [5,1703,23]
      else
        list_id_page = [id_page]
      end
    end
    return list_id_page
  end

  def self.buildListImage(list_imgs)
    list_final = []
    list_imgs.each_with_index  do |img,index|
      list_final.push({ 'url'=>img.path,'alt_title' =>img.title})
    end
    return list_final
  end
end