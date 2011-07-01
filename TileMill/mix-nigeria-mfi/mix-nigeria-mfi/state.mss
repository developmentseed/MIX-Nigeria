/*
  # MIX Nigeria Microfinance Institutions Mapping #
  ## Stylesheet for location markers and labels ##

  ### Location Markers ###
  - Markers (circles/points) appear only at zoom levels 5-8
  - Marker opacity is lower (.65) at zoom level 6
  - Markers change size at each zoom level
*/
  
#mfi-state [zoom > 4][zoom <= 8]{
  marker-height: 20;
  marker-fill: #fff;
  marker-opacity: .5;
  marker-line-width: .5;
  marker-line-color: #999;
  marker-line-opacity: .8;
  marker-allow-overlap:true;
  [zoom = 5] {
    marker-line-width:.7; 
    marker-opacity: .8;
    [Open > 100] { marker-height: 20; }
    [Open <= 100] { marker-height: 14; }
    [Open <= 40] { marker-height: 9; }
    [Open <= 20] { marker-height: 5; }
    [Open <= 10] { marker-height: 3; }
    [Open = 0] { marker-height: 0; }
  }
  [zoom = 6] {
    marker-line-width:.8; 
    marker-opacity: .65;
    [Open > 100] { marker-height: 38; }
    [Open <= 100] { marker-height: 26; }
    [Open <= 40] { marker-height: 18; }
    [Open <= 20] { marker-height: 11; }
    [Open <= 10] { marker-height: 8; }
    [Open = 0] { marker-height: 0; }
  }
  [zoom = 7] {
    marker-line-width:.9;
    [Open > 100] { marker-height: 70; }
    [Open <= 100] { marker-height: 50; }
    [Open <= 40] { marker-height: 36; }
    [Open <= 20] { marker-height: 20; }
    [Open <= 10] { marker-height: 11; }
    [Open = 0] { marker-height: 0; }
  }
  [zoom >= 8] {
    marker-line-width:1;
    [Open > 100] { marker-height: 130; }
    [Open <= 100] { marker-height: 100; }
    [Open <= 40] { marker-height: 70; }
    [Open <= 20] { marker-height: 44; }
    [Open <= 10] { marker-height: 18; }
    [Open = 0] { marker-height: 0; }
  }
}

/*
  ### Label Styles ###
  - Labels (numbers) appear only at zoom levels 6-8
  - Label text shows count of Open MFIs
  - At zoom level 7, labels become a slightly lighter color
  - Label height changes at each zoom level
  - Labels are displaced if they would be too big for a marker
*/

#mfi-state::labels [zoom > 5][zoom <= 8]{
  text-name:"[Open]";
  text-face-name: "DejaVu Sans Condensed";
  text-fill: #666;
  text-allow-overlap: true;

  [zoom = 6] {
    text-size: 11;
    [Open > 100] { text-dy:12; }
    [Open <= 20] { text-size: 9; }
    [Open = 0] { 
      text-size: 0; 
      text-halo-radius: 0;
    }
  }
  [zoom = 7] {
    text-size: 14; 
    text-fill: #808080;
    [Open > 100] { text-dy: 40; }
    [Open <= 100] { text-dy: 26; }
    [Open <= 40] { text-dy: 12; }
    [Open <= 20] { 
      text-dy: 23;
      text-halo-fill: #fff; 
      text-halo-radius: 1; 
    }
    [Open <= 10] { 
      text-dy: 14 ;
      text-halo-fill: #fff; 
      text-halo-radius: 1; 
    }
    [Open = 0] { 
      text-size: 0; 
      text-halo-radius: 0;
    }
  }  
  [zoom = 8] {
    text-size: 14; 
    text-fill: #808080;
    [Open > 100] { text-dy: 100; }
    [Open <= 100] { text-dy: 70; }
    [Open <= 40] { text-dy: 40; }
    [Open <= 20] { text-dy: 20; }
    [Open <= 10] { text-dy: 2; }
    [Open = 0] { 
      text-size: 0; 
      text-halo-radius: 0;
    }
  }  
}