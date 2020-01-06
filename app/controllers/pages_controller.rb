require 'rubygems'
require 'readability'
require 'open-uri'

class PagesController < ApplicationController
  
  def index
    
  end

  def getNews
    url = params[:url]    
    @source = open(url).read
    @content = Readability::Document.new(@source).content    
    respond_to do |format|      
      format.json { render json: @source }
    end
  end

  def show
  end
end
