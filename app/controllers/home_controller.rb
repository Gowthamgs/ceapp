class HomeController < ApplicationController
 before_action :authenticate_use!

  def index
       
        @text = "Coal Bearing Areas Acquisition and Development \nTACT 20 \nProvided further that no person who has received the amount \notherwise than under protest shall be entitled to take any matter \nunder this Act before the Tribunal \n3 When the amount of compensation is not paid or deposited \nas required by this section the Central Government shall be liable \nto pay interest thereon at the rate of five per centum per annum \nfrom the time the compensation became due until it shall have been \nso paid or deposited \nProspecting \n18 Where prospecting is done under this Act by or on behalf \nand mining \nof the Central Government in any land situate within the jurisdiction \nto be done \nby Central \nof a State Government or where the Central Government or a Gov \nGovernment \nernment company has become the lessee of a State Government in \nin confo \nmity with \nrespect of any land under this Act the terms and conditions under \nthe Mineral \nn which the prospecting can be done or rights under the lease ex \nRules \nercised shall as far as may be be the same as the terms and con \nditions applicable to prospecting licences and mining leases under \nthe Mineral Concession Rules and in case of doubt or dispute shall \nbe settled by arbitration or in such other manner as the Central \nGovernment and the State Government may decide \nPower to \n19 The Central Government may by notification in the Official \ndelegate \nGazette direct that all or any of the powers or duties which may be \nexercised or discharged by it under this Act shall in such circum \nstances and under such conditions if any as may be specified in the \nnotification be exercised or discharged also by any person specified in \nthis behalf in the notification and any such person may with the \nprevious approval of the Central Government by order in writing \ndirect that any power or duty which has been directed to be exercis \ned or discharged by him shall in such circumstances and under \nspecified in the direction be \nsuch conditions if any as may be \nexercised or discharged by any such person subordinate to him as \nmay be specified therein \n20 1 Any person aggrieved by any award of the Tribunal \nAppeals \nunder section 14 may within thirty days from the date of such \naward prefer an appeal to the High Court within whose jurisdiction \nthe land or some portion of the land which has been acquired or the \nland or some portion of the land covered by a prospecting license \nor by a mining lease in respect of which mining rights have been \nacquired is situate \n2 Any person aggrieved by an order made by \na competent \nauthority or by any other person in virtue of any powers exercis \nable by him under this Act may within twenty-one days from the \ndate of the order prefer an appeal to the Central Government"
 end

 
def save
    Post.create(:data => String.new(params[:data]))
    binding.pry
    doc = Nokogiri::HTML(params[:data])
    doc.css('html').css('body').css('div').each do |link|
    @fri = Post.new
    @fri.tag = link.name
    @fri.save
   
end
    doc.css('html').css('body').css('div').each do |link|
    @fri = Post.new
    @fri.value = link.values
    @fri.save


end
  
   doc.css('html').css('body').css('div').each do |link|
   @fri = Post.new
   @fri.text =link.text.strip
   @fri.save
end
    doc.css('html').css('body').css('div').each do |link|
    @fri = Post.new
    @fri.temp = link.values
    @fri.save
 end   


    redirect_to root_path
  
  
 end   
   
  

    

    
    
  
  # def merge
    
  #   merge_text1 = params['merge_text']
  #   before_merge = params['merge_text']
  #   document_text1 = params['document_text']
  #   params['document_text'].gsub!(/\n/,"")
  #   # params['document_text'].gsub!(params['merge_text'],merge_text)
  #   merge_text1.gsub!('<p>','')
  #   merge_text1.gsub!('</p>','')
  #   merged = "<p>" + merge_text1 + "</p>"
    
  #   params['document_text'].gsub!(before_merge, merged)
  #   #puts merge_text
  #   render :json => { success: params['document_text'], status:200 }, status:200
  # end
 
   
end


 

