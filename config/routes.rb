Rails.application.routes.draw do
  root to: 'pages#index'
  get 'pages/show'
  get 'pages/getNews'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
