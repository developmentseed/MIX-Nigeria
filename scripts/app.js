var m,
    b,
    legend,
    interaction,
    level,
    mm           = com.modestmaps,
    activeStatus = 'mix.mix-nigeria-mfb-licensed',
    activeLayer  = 'mix.MIX_Nigeria_Population2006',
    baseLayers   = 'mapbox.world-blank-bright,mix.world-urban-areas,',
    borderLayers = ',mix.Nigeria-LGA-borders,mapbox.world-borders-dark,mix.mix-nigeria-sharialine,',
    layers       = baseLayers + activeLayer + borderLayers + activeStatus,
    url = 'http://api.tiles.mapbox.com/v3/' + layers + '.jsonp';

wax.tilejson(url, function(tilejson) {
  tilejson.minzoom = 4;
  tilejson.maxzoom = 10;
  b                = new mm.Map('map', new wax.mm.connector(tilejson), null, null);
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
  interaction = wax.mm.interaction(m, tilejson);
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
  m.addCallback('drawn', function (m) {
      b.setCenterZoom(m.getCenter(), m.getZoom());
  });
});

function refreshMap() {
  url = 'http://api.tiles.mapbox.com/v3/' + layers + '.jsonp';
  wax.tilejson(url, function(tilejson) {
    tilejson.minzoom = 4;
    tilejson.maxzoom = 10;
    m.setProvider(new wax.mm.connector(tilejson));
    window.setTimeout(function() {
        b.setProvider(new wax.mm.connector(tilejson));
    }, 750);
    $('.wax-legends').remove();
    interaction.remove();
    legend = wax.mm.legend(m, tilejson).appendTo(m.parent);
    interaction = wax.mm.interaction(m, tilejson);
  });
}

$(function (){

  $('a#MIX_Nigeria_Population2006').addClass('active');

  //contextual layer switching
  $('.layers li a').click(function() {
    activeLayer = 'mix.' + this.id;
    $('.layers li a').removeClass('active');
    $(this).addClass('active');

    layers = baseLayers + activeLayer + borderLayers + activeStatus;
    
    refreshMap();
  });

  //point data selector
  $('#status-select').change(function() {
    activeStatus = 'mix.' + $('#status-select option:selected')[0].id;
    layers = baseLayers + activeLayer + borderLayers + activeStatus;

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
