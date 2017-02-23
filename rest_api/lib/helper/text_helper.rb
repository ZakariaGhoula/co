class TextHelper

  def self.html_truncate(html, truncate_length, options={})
    text, result = [], []
    # get all text (including punctuation) and tags and stick them in a hash
    html.scan(/<\/?[^>]*>|[A-Za-z0-9.,\/&#;\!\+\(\)\-"'?]+/).each { |t| text << t }
    text.each do |str|
      if truncate_length > 0
        if str =~ /<\/?[^>]*>/
          previous_tag = str
          result << str
        else
          result << str
          truncate_length -= str.length
        end
      else
        # now stick the next tag with a  that matches the previous
        # open tag on the end of the result
        if previous_tag && str =~ /<\/([#{previous_tag}]*)>/
          result << str
        end
      end
    end
    return result.join(" ") + options[:omission].to_s
  end


  def self.removeHtmlTags(html)
    return html.to_s.gsub!(/(<[^>]+>|&nbsp;|\r|\n)/,"")
  end

  def self.strip_url(target_url)
    target_url.gsub("http://", "")
        .gsub("https://", "")
        #.gsub("www.", "")
  #URI.parse(uri).host
  end

  def self.author(string,lng)
    if(lng=='en')
      string.gsub("avec","with")
            .gsub("et","and")
            .gsub("Par","By")
            .gsub("assistée par","assisted by")
            .gsub("assistée de","assisted by")
    end
  end
end