import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import scrollama from "scrollama";
import {
  Chapter,
  Config,
  layerTypes,
  LayerType,
  ChapterEffect,
} from "constants/mapboxDemo";

const transformRequest = (url: string) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery
    ? "&pluginName=journalismScrollytelling"
    : "?pluginName=journalismScrollytelling";
  return {
    url: url + suffix,
  };
};

type Props = {
  config: Config;
};

const MapboxContainer = ({ config }: Props) => {
  const [currentChapter, setCurrentChapter] = useState(config.chapters[0]);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapStart = config.chapters[0].location;

    mapboxgl.accessToken = config.accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: config.style,
      center: mapStart.center,
      zoom: mapStart.zoom,
      pitch: mapStart.pitch,
      bearing: mapStart.bearing,
      transformRequest: transformRequest,
    });

    new mapboxgl.Marker().setLngLat(mapStart.center).addTo(map);

    if (config.showMarkers) {
      console.log({ center: mapStart.center });
      new mapboxgl.Marker().setLngLat(mapStart.center).addTo(map);
    }

    function getLayerPaintType(layer: LayerType) {
      const layerType = map.getLayer(layer) && map.getLayer(layer).type;
      // @ts-ignore - should have a more complete set of layerTypes
      return layerTypes[layerType];
    }

    function setLayerOpacity(layer: ChapterEffect) {
      var paintProps = getLayerPaintType(layer.layer);

      if (paintProps) {
        paintProps.forEach(function (prop: any) {
          map.setPaintProperty(layer.layer, prop, layer.opacity);
        });
      }
    }
    // instantiate the scrollama
    const scroller = scrollama();

    map.on("load", function () {
      // setup the instance, pass callback functions
      scroller
        .setup({
          step: ".step",
          offset: 0.5,
          progress: true,
        })
        .onStepEnter((response) => {
          const chapter = config.chapters.find(
            (chap: Chapter) => chap.id === response.element.id
          );

          if (!chapter) {
            return;
          }
          setCurrentChapter(chapter);
          map.flyTo(chapter.location);

          console.log(config.showMarkers);
          if (config.showMarkers) {
            new mapboxgl.Marker().setLngLat(mapStart.center).addTo(map);
          }
          if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity);
          }
        })
        .onStepExit((response) => {
          var chapter = config.chapters.find(
            (chap: Chapter) => chap.id === response.element.id
          );

          if (!chapter) {
            return;
          }
          if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
          }
        });

      map.addSource("places", {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description:
                  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: [121.555204, 25.038152],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
        },
      });
    });

    window.addEventListener("resize", scroller.resize);
  }, [mapContainerRef]);

  const theme = config.theme;
  const currentChapterID = currentChapter.id;

  return (
    <div>
      <div ref={mapContainerRef} className="absolute top right left bottom" />
      <div id="story">
        {config.title && (
          <div id="header" className={theme}>
            <h1>{config.title}</h1>
            {config.subtitle && <h2>{config.subtitle}</h2>}
            {config.byline && <p>{config.byline}</p>}
          </div>
        )}
        <div id="features">
          {config.chapters.map((chapter) => (
            <ChapterComponent
              key={chapter.id}
              theme={theme}
              {...chapter}
              currentChapterID={currentChapterID}
            />
          ))}
        </div>
        {config.footer && (
          <div id="footer" className={theme}>
            <p>{config.footer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

type ChapterProps = Chapter & {
  theme: string;
  currentChapterID: string;
};

const ChapterComponent = ({
  id,
  theme,
  title,
  image,
  description,
  currentChapterID,
}: ChapterProps) => {
  const classList = id === currentChapterID ? "step active" : "step";

  return (
    <div id={id} className={classList}>
      <div className={theme}>
        {title && <h3 className="title">{title}</h3>}
        {image && <img src={image} alt={title}></img>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default MapboxContainer;
