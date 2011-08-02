var m,
    legend,
    level,
    mm           = com.modestmaps,
    activeStatus = 'mix-nigeria-mfb-licensed',
    activeLayer  = 'MIX_Nigeria_Population2006',
    layers       = [
      'mapbox.world-blank-bright',
      'world-urban-areas',
      activeLayer,
      'Nigeria-LGA-borders',
      'mapbox.world-borders-dark',
      'mix-nigeria-sharialine',
      activeStatus
    ].join(','),
    url = 'http://a.tiles.mapbox.com/mix/1.0.0/'+layers+'/layer.json';

function getTiles() { 
  return [
  "http://a.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.png",
  "http://b.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.png",
  "http://c.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.png",
  "http://d.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.png"
  ]
};

function getGrids() { 
  return [
  "http://a.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.grid.json",
  "http://b.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.grid.json",
  "http://c.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.grid.json",
  "http://d.tiles.mapbox.com/mix/1.0.0/"+layers+"/{z}/{x}/{y}.grid.json"
  ]
};

wax.tilejson(url, function(tilejson) {
  tilejson.tiles   = getTiles();
  tilejson.grids   = getGrids();
  tilejson.minzoom = 4;
  tilejson.maxzoom = 10;
  m                = new mm.Map('map', 
      new wax.mm.connector(tilejson),
      null,
      [
        new mm.DragHandler,
        new mm.DoubleClickHandler,
        new mm.TouchHandler
      ]
  );
  screen.width >= 1920 ? level = 7 : level = 6
  m.setCenterZoom(new mm.Location(9.5, 12), level);
  wax.mm.interaction(m, tilejson);
  legend = wax.mm.legend(m, tilejson).appendTo(m.parent);
  wax.mm.zoomer(m, tilejson).appendTo($('#controls')[0]);
  wax.mm.zoombox(m, tilejson);

  // Bandwidth detection control and switch element
  var detector = wax.mm.bwdetect(m, {
    auto: true,
    png: '.png32?'
  });
  m.addCallback('drawn', function lqDetect(modestmap, e) {
    if (!detector.bw()) {
      $('#bwtoggle').removeClass('active');
    }
    m.removeCallback(lqDetect);
  });
  $('a#bwtoggle').click(function(e) {
      e.preventDefault();
      $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
      detector.bw(!detector.bw());
  });
});

function refreshMap() {
  url = 'http://a.tiles.mapbox.com/mix/1.0.0/'+layers+'/layer.json';
  wax.tilejson(url, function(tilejson) {
    tilejson.minzoom = 4;
    tilejson.maxzoom = 10;
    tilejson.tiles = getTiles();
    tilejson.grids = getGrids();
    m.setProvider(new wax.mm.connector(tilejson));
    $('.wax-legends').remove();
  });
}

$(function (){

  $('a#MIX_Nigeria_Population2006').addClass('active');

  //contextual layer switching
  $('.layers li a').click(function() {
    activeLayer = this.id;
    $('.layers li a').removeClass('active');
    $(this).addClass('active');

    layers = [
      'mapbox.world-blank-bright',
      'world-urban-areas',
      activeLayer,
      'Nigeria-LGA-borders',
      'mapbox.world-borders-dark',
      'mix-nigeria-sharialine',
      activeStatus
    ].join(',');

    refreshMap();
  });

  //point data selector
  $('#status-select').change(function() {
    activeStatus = $('#status-select option:selected')[0].id;
    layers = [
      'mapbox.world-blank-bright',
      'world-urban-areas',
      activeLayer,
      'Nigeria-LGA-borders',
      'mapbox.world-borders-dark',
      'mix-nigeria-sharialine',
      activeStatus
    ].join(',');

    refreshMap();
  });

  // Update and show embed script
  $('a.embed').click(function (e) {
    e.preventDefault();

    var splitLayers = layers.split(','),
        embedlayers = '',
        center = m.pointLocation(new mm.Point(m.dimensions.x/2,m.dimensions.y/2));

    $.each(splitLayers, function(num, key) {
      embedlayers += '&amp;layers%5B%5D=' + key;
    });

    var embedId = 'ts-embed-' + (+new Date());
    var url = '&amp;size=700'
            + '&amp;size%5B%5D=550'
            + '&amp;center%5B%5D=' + center.lon
            + '&amp;center%5B%5D=' + center.lat
            + '&amp;center%5B%5D=' + 6
            + embedlayers
            + '&amp;options%5B%5D=zoomwheel'
            + '&amp;options%5B%5D=legend'
            + '&amp;options%5B%5D=tooltips'
            + '&amp;options%5B%5D=zoombox'
            + '&amp;options%5B%5D=zoompan'
            + '&amp;options%5B%5D=attribution'
            + '&amp;el=' + embedId;

    $('.tip input').attr('value', "<div id='"
      + embedId
      + "-script'><script src='http://tiles.mapbox.com/mix/api/v1/embed.js?api=mm"
      + url
      + "'></script></div>");

    if ($('#embed').hasClass('active')) {
      $('#embed').removeClass('active');
    } else {
      $('#embed').addClass('active');
      $('#embed-code')[0].tabindex = 0;
      $('#embed-code')[0].focus();
      $('#embed-code')[0].select();
    }
  });
});
