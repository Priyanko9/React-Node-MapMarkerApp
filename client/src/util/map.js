import React,{Component} from 'react';

export default class Map extends Component{
    
    onScriptLoad(){
        //create map
        let googleMap=new window.google.maps.Map(document.getElementById(this.props.id),this.props.options);
        //call callback function to create marker and other functionalities
        this.props.onMapLoad(googleMap);
    }
    componentDidMount(){
        if(!window.google){
            let mapScript=document.createElement("script");
            mapScript.type="text/javascript"
            mapScript.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDD48XLaImS9m7ssNrOF0-Yt6ZR0aZCPec"
            let firstScriptElement=document.getElementsByTagName("script")[0];
            firstScriptElement.parentNode.insertBefore(mapScript,firstScriptElement);

            mapScript.addEventListener("load",(event)=>{
                // fires when the script is loaded
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad();
        }
    }
    render(){
        return(
            <div id={this.props.id} className="map"></div>
        )
    }
}