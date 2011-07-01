/****  Stylesheet for Creating External Data Layers  *****/

/* Color variables */
@grey: #CCC;
@blue1: #97b3ce;
@blue2: #5e88b3;
@blue3: #3c5e80;
@blue4: #213446;

/****  Example of Population external data layer   ****/
/* To create new layers, add the new shapefile with attribute data
and adjust data variable name and scale.The settings below will 
match the style of the existing layers.  */

#state-pop [NAME_1!='Water body'] {
  [TOTAL <= 3000000]{polygon-fill: @blue1;}
  [TOTAL > 3000000][TOTAL <= 5000000]{polygon-fill: @blue2;}
  [TOTAL > 5000000][TOTAL <= 7000000]{polygon-fill: @blue3;}
  [TOTAL > 7000000]{polygon-fill: @blue4;}
  polygon-opacity: 0.5;
  line-color: @grey;
  line-width: 0.25;
 }

/*  In addition to changing the data variables and scale, the 
interactivity and legend will need to be changed as well. These
settings can be changed in the 'Settings' menu above. */
