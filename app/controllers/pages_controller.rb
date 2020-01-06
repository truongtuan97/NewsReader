require 'rubygems'
require 'readability'
require 'open-uri'

class PagesController < ApplicationController
  
  def index
    
  end

  def getNews
    url = params[:url]
    source = open(url).read
    @content = Readability::Document.new(source).content

    respond_to do |format|
      # format.html { redirect_to(person_list_url) }
      format.js
      # format.xml  { render :xml => @person.to_xml(:include => @company) }
    end
  end

  def show
  end
end
