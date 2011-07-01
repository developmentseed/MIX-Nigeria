/*
  # MIX Nigeria Microfinance Institutions Mapping #
  ## Stylesheet for location markers and labels ##

  ### Location Markers ###
  - Markers (circles/points) appear only at zoom levels 9-10
  - Markers change size at each zoom level
*/

#mfi-lga [zoom > 8]{
  marker-height: 20;
  marker-fill: #fff;
  marker-opacity: .5;
  marker-line-width: .5;
  marker-line-color: #999;
  marker-line-opacity: .8;
  marker-allow-overlap:true;
  [zoom = 9] {
    marker-line-width:.7; 
    [Open > 10] { marker-height: 40; }
    [Open <= 10] { marker-height: 28; }
    [Open <= 4] { marker-height: 18; }
    [Open <= 2] { marker-height: 10; }
    [Open <= 1] { marker-height: 6; }
    [Open = 0] { 
      marker-height: 0;
      marker-line-width: 0;
    }
  }
  [zoom = 10] {
    marker-line-width:.8; 
    [Open > 10] { marker-height: 76; }
    [Open <= 10] { marker-height: 52; }
    [Open <= 4] { marker-height: 36; }
    [Open <= 2] { marker-height: 22; }
    [Open <= 1] { marker-height: 16; }
    [Open = 0] { 
      marker-height: 0;
      marker-line-width: 0;
    }
  }
}

/*
  ### Label Styles ###
  - Labels (numbers) appear only at zoom levels 5-7
  - At zoom level 5, values less than or equal to 20 do not appear
  - At zoom level 7, labels become a slightly lighter color
  - Labels greater than or equal to 100 are displaced at all zoom levels
  - All labels are displaced slightly at zoom level 7
  - Labels less than or equal to 20 have a halo at zoom level 7
  - Label height changes at each zoom level
*/

#mfi-lga::labels [zoom > 8] {
  text-name:"[Open]";
  text-face-name: "DejaVu Sans Condensed";
  text-fill: #666;
  text-allow-overlap: true;
  [zoom = 9] {
    text-size: 14; 
    text-fill: #808080;
    [Open <= 2] { 
      text-dy: 23;
      text-halo-fill: #fff; 
      text-halo-radius: 1; 
    }
    [Open <= 1] { 
      text-dy: 10 ;
      text-halo-fill: #fff; 
      text-halo-radius: 1; 
    }
    [Open = 0] { 
      text-size: 0; 
      text-halo-radius: 0;
    } 
  }  
  
  [zoom = 10] {
    text-size: 18; 
    text-fill: #808080;
    [Open = 0] { 
      text-size: 0; 
      text-halo-radius: 0;
    }
  }  
}