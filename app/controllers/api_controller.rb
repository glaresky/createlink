class ApiController < ApplicationController

  # POST /api/urls_delete_all
  def urls_delete_all
    Url.delete_all
    render :json => {:success => 'YES'}
  end

end
