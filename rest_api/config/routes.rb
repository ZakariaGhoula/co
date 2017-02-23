Rails.application.routes.draw do


  devise_for :user, only: []
  namespace :api, path: '/', constraints: {subdomain: 'api'}, defaults: {format: 'json'} do
    namespace :v1 do

      #profile
      post '/user/form/skiped', :to => 'user#skip_form_user'
      post '/user/form/save', :to => 'user#save_form_user'

      post '/user/update/facebook', :to =>'user#update_profile_user'

      get '/profile', :to => 'user#show_profile_user'
      post '/profile/avatar', :to => 'user#upload_avatar'
      get '/profile/reload_blur_avatar', :to => 'recipe#reload_blur_avatar'
      post '/profile/update_basic', :to => 'user#update_profile'
      post '/profile/about', :to => 'user#update_about'
      post '/profile/notifications/recipe', :to => 'user#update_notification_recipe'
      post '/profile/notifications/follow', :to => 'user#update_notification_follow'
      post '/profile/notifications/app', :to => 'user#update_notification_app'
      post '/profile/recipes/offline', :to => 'user#update_recipe_offline'
      post '/profile/locale', :to => 'user#update_locale'
      post '/profile/check/email', :to => 'user#check_already_email'
      post '/profile/check/password', :to => 'user#check_password'
      post '/profile/update/password', :to => 'user#update_password'
      #visitor
      get '/profile/visitor', to: 'user#visitor'
      get '/profile/visitor/network', to: 'user#visitor_network'
      post '/profile/network/add', to: 'user#add_network'
      post '/profile/network/remove', to: 'user#remove_network'
      get '/profile/network/my', to: 'user#my_network'
      post '/profile/network/facebook', to: 'user#facebook_network'
      post '/profile/network/suggestions/new', to: 'user#suggestion_friends_new'

      #post '/account/update/email', :to => 'account#update_email'

      #recipes
      get '/recipe', :to => 'recipe#show_recipe'
      get '/recipe/my', :to => 'recipe#get_recipe_by_pk'
      get '/recipes/token', :to => 'recipe#get_list_recipes_by_token'
      get '/recipes/token/refresh', :to => 'recipe#get_list_recipes_by_token_refresh'
      get '/recipes/postby', :to => 'user#get_user_poster_recipe'
      get '/recipes/images', :to => 'recipe#retrieve_image_recipe'
      get '/recipes/processing', :to => 'recipe#get_processing_recepie'
      post '/recipes/add', :to => 'recipe#add_recipe'
      post '/recipes/add/title', :to => 'recipe#add_recipe_title'
      post '/recipes/update/title', :to => 'recipe#update_recipe_title'
      post '/recipes/update/url', :to => 'recipe#update_recipe_url'
      post '/recipes/update/text', :to => 'recipe#update_recipe_text'
      post '/recipes/update/tags', :to => 'recipe#update_recipe_tags'
      post '/recipes/update/type', :to => 'recipe#update_recipe_type_save'
      post '/recipes/update/image/add', :to => 'recipe#update_recipe_add_img'
      post '/recipes/update/image/delete', :to => 'recipe#update_recipe_delete_img'
      post '/recipes/update/image/ordering', :to => 'recipe#update_recipe_ordering_img'
      post '/recipes/add_from_exist', :to => 'recipe#add_recipe_exist'
      post '/recipes/add_recipe_exist_title', :to => 'recipe#add_recipe_exist_title'
      post '/recipe/update', :to => 'recipe#update_recipe'
      post '/recipe/delete', :to => 'recipe#delele_recipe'

      #recipe like
      get '/recipe/like', :to => 'recipe#likes'
      post '/recipe/like/add', :to => 'recipe#add_like'
      post '/recipe/like/remove', :to => 'recipe#remove_like'

      get '/tags/suggest', :to => 'tags#get_tags_suggest'
      get '/tags/autocomplete', :to => 'tags#get_tags_autocomplete'

      #season products
      get '/products/season', :to => 'products#get_defaults_season_products'
      get '/products/season/id', :to => 'products#get_defaults_season_products_by_id'
      post '/products/add', :to => 'products#add_season_products'
      post '/products/delete', :to => 'products#delete_season_products'
      get '/products/my', :to => 'products#get_season_products'


      #search
      post 'search', to: 'search#search'
      get 'search/follow', to: 'search#search_follow'
      get 'search/all', to: 'search#new_search'
      get 'search/clear', to: 'search#new_search'


      #newsfeed
      get '/newsfeed', to: 'newsfeed#load'
      get '/newsfeed/explore', to: 'newsfeed#load_explore'
      get '/newsfeed/abos', to: 'newsfeed#load_abos'
      get '/newsfeed/team', to: 'newsfeed#load_team'
      get '/newsfeed/reload', to: 'newsfeed#reload'
      get '/newsfeed/explore/reload', to: 'newsfeed#reload_explore'
      get '/newsfeed/abos/reload', to: 'newsfeed#reload_abos'
      get '/newsfeed/team/reload', to: 'newsfeed#reload_team'


      #consultation
      get '/consultation/user', :to => 'user#consultation_profile_user'

      #custom account
      post '/account/update/gender', :to => 'account#update_gender'
      post '/account/update/currency', :to => 'account#update_currency'
      post '/account/update/birthday', :to => 'account#update_birthday'
      post '/account/update/name', :to => 'account#update_name'
      post '/account/update/email', :to => 'account#update_email'
      post '/account/update/password', :to => 'account#update_password'
      post '/account/update/localisation', :to => 'account#update_localisation'
      post '/account/update/phone_number', :to => 'account#update_phone_number'
      post '/account/update/notifications/email', :to => 'account#update_notifications_email'
      post '/account/update/preferences/social', :to => 'account#update_preferences_social'
      post '/account/update/preferences/desactivation', :to => 'account#update_preference_desactivation'
      get '/account/check/email', :to => 'account#check_email_exist'
      post '/account/check/password', :to => 'account#check_password'

      get '/account/list/countries_phone_code', :to => 'account#get_countries_code_phone'


      #message
      get '/messenger/user', :to => 'messenger#retrieve_user'
      get '/messenger/detailjob', :to => 'messenger#retrieve_detail_job'

      get '/geoloc/lieu/autocomplete', :to => 'geoloc#lieu_autocomplete'
      get '/geoloc/list/countries', :to => 'geoloc#list_countries'


      #jobs
      get '/job/list/active', :to => 'job#list_job_active'
      get '/job/list/sectors', :to => 'job#list_sector_job'
      get '/job/list/job/autocomplete', :to => 'job#list_job_autocomplete'


      get '/search/detail', :to => 'search#detail'
      get '/favourite/detail', :to => 'favourite#detail'


      post '/newsletter/subscribe', :to => 'newsletter#subscribe'
      post '/newsletter/contact', :to => 'newsletter#contact'


      #config
      get '/config/langue', :to => 'config#get_langue'
      get '/config/tags_recipe', :to => 'config#get_tags_recipe'

      #users
      devise_scope :user do
        post 'registrations' => 'registrations#create', :as => 'register'
        post 'sign_in' => 'session#create', :as => 'login'
        post 'logout' => 'session#logout', :as => 'logout'
        post 'oauth_facebook' => 'oauth_#facebook', :as => 'facebook'
        post 'oauth_facebook2' => 'oauth_#facebook2', :as => 'facebook2'
        # delete 'sessions' => 'sessions#destroy', :as => 'logout'
      end
    end


  end
  #error
  get '/404' => 'errors#not_found'
  get '/500' => 'errors#exception'
  get '/401' => 'errors#unauthorized'
end
