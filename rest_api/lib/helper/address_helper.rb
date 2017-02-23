class AddressHelper

  def self.getLngLat(position)
    latlng= Coordonnees.new(nil, nil, nil)


    if !position.nil?
      arr = position.split(",")
      if arr.size == 2
        latlng.id(0)
        latlng.lat(arr[0])
        latlng.lng(arr[1])
      end
    end
    return latlng
  end

  def self.getTransport(id_metro, type_transport)
    metro = Coordonnees.new(nil, nil, nil)
    if !id_metro.nil?
      data = Transport.select('id,coordonnes_y,coordonnes_x').where('id=? and typeTransport_id= ?', "#{id_metro}", "#{type_transport}").first
      if !data.nil?
        metro.id(id_metro.to_i)
        metro.lat(data.coordonnes_y)
        metro.lng(data.coordonnes_x)
      end
    end
    return metro
  end

  def self.getListCat(list_categorie)
    liste_data =[]
    if !list_categorie.nil?
      darr = list_categorie.split(",")
      if darr.size > 0
        liste_data =darr
      end
    end
    return liste_data
  end



  def self.buildListAddresses(list_address)
    list_final = []
    list_address.each  do |add|
      if (!add.title.nil?)
        data = {}

        data['name'] = add.title.strip unless add.title.nil?
        data['address'] = add.address.strip unless add.address.nil?
        data['zipcode'] = add.zipcode.strip unless add.zipcode.nil?
        data['city'] = add.city.strip unless add.city.nil?
        if(add.land.nil? && !add.city.nil?)
          if(add.city.strip == "Paris")
            data['country'] = "France"
          end
        else
          data['country'] = add.land.strip unless add.land.nil?
        end

        data['lat'] = add.lat.strip unless add.lat.nil?
        data['lng'] = add.lng.strip unless add.lng.nil?
        if !add.email.nil?
        data['email'] = add.email.strip
        else
          data['email'] = ""
        end

        data['tel'] = add.tel.strip unless add.tel.nil?
        data['website'] = TextHelper.strip_url(add.website) unless add.website.nil?

        #2 test if mobile
        data['is_mobile'] = (MobileAdressePeer.checkIfMobile(add.id)) ? 0 : 1
        list_final.push(data)
      end

    end
    return list_final
  end
end