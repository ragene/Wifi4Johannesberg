Rails.application.routes.draw do
  #get 'cost_plan/index'
	get "kostenprognose" => "cost_plan#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
