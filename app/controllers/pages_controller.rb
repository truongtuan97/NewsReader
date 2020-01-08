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
    url = params[:page]
    @source = open(url).read
    @content = Readability::Document.new(@source).content
    @rbody = Readability::Document.new(@source, 
      :tags => %w[div p img a], 
      :attributes => %w[src href], 
      :remove_empty_nodes => false)    
    p @rbody
    p @rbody.images    
  end
end
