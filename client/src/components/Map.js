import React,{Component} from 'react';
import {MAP_URL,GOOGLEMAP_TOKEN} from '../util/constant';

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
            mapScript.src=MAP_URL+'?key='+GOOGLEMAP_TOKEN;
            let firstScriptElement=document.getElementsByTagName("script")[0];
            firstScriptElement.parentNode.insertBefore(mapScript,firstScriptElement);//insuring that map script is the first to load
            mapScript.addEventListener("load",(event)=>{
                //call this method after the script is loaded
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad();
        }
    }
    render(){
        return(
            <div id={this.props.id} data-test="mapComponent" className="map"></div>
        )
    }
}