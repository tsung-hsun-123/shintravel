// route-map.jsx — MapLibre GL version
// Full color control, English-only labels, same warm earthy palette

// ─── Replace each photos[] with your own images when you have them ───────────
const STOPS = [
  { id:'beijing', city:'Beijing', country:'China', lat:39.9042, lon:116.4074, day:1, date:'Jun 23', tag:'Departure',
    note:'One bag. One direction. The rest was open.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'zamynuud', city:'Zamyn Uud', country:'Mongolia', lat:43.7286, lon:111.8983, day:1, date:'Jun 23', tag:'Border',
    note:'First Mongolian stamp. The Gobi Desert begins right outside the window.', link:'gallery.html',
    photos:[
      'photos/mongolia/zamynuud-8907.webp',
      'photos/mongolia/zamynuud-8928.webp',
      'photos/mongolia/zamynuud-8954.webp',
      'photos/mongolia/zamynuud-8956.webp',
    ]},
  { id:'ulaanbaatar', city:'Ulaanbaatar', country:'Mongolia', lat:47.8864, lon:106.9057, day:3, date:'Jun 25', tag:'Steppe',
    note:'Genghis Khan sites and more sky than I had ever earned.', link:'gallery.html',
    photos:[
      'photos/mongolia/ulaanbaatar-8980.webp',
      'photos/mongolia/ulaanbaatar-9044.webp',
      'photos/mongolia/ulaanbaatar-8990.webp',
      'photos/mongolia/ulaanbaatar-9086.webp',
    ]},
  { id:'baikal', city:'Lake Baikal', country:'Russia', lat:52.2978, lon:104.2964, day:4, date:'Jun 25', tag:'Crossing',
    note:'World\'s deepest lake. Smoked omul on the shore.', link:'gallery.html',
    photos:[
      'photos/russia/slyudyanka-9309.webp',
      'photos/russia/slyudyanka-9307.webp',
      'photos/russia/irkutsk-9287.webp',
      'photos/russia/ulanude-9188.webp',
    ]},
  { id:'moscow', city:'Moscow', country:'Russia', lat:55.7558, lon:37.6173, day:11, date:'Jul 2', tag:'City',
    note:'Red Square, Kremlin — the weight of history on every corner.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'stpetersburg', city:'St. Petersburg', country:'Russia', lat:59.9311, lon:30.3609, day:14, date:'Jul 5', tag:'City',
    note:'The Hermitage, the canals, and the light that never quite died.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'tallinn', city:'Tallinn', country:'Estonia', lat:59.4370, lon:24.7536, day:17, date:'Jul 8', tag:'Baltics',
    note:'Medieval walls, cobblestones, and a city that forgot to rush.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1548534904-e3e7a7b7c4e1?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'vilnius', city:'Vilnius', country:'Lithuania', lat:54.6872, lon:25.2797, day:19, date:'Jul 10', tag:'Baltics',
    note:'Uzupis — the bohemian republic that declared itself free.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1548534904-e3e7a7b7c4e1?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'warsaw', city:'Warsaw', country:'Poland', lat:52.2297, lon:21.0122, day:20, date:'Jul 11', tag:'History',
    note:'WWII Rising Museum. Milk bar meals. A city rebuilt from rubble.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'krakow', city:'Kraków', country:'Poland', lat:50.0647, lon:19.9450, day:22, date:'Jul 13', tag:'History',
    note:'Wawel Castle, Kazimierz, and the salt cathedral underground.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'prague', city:'Prague', country:'Czech Republic', lat:50.0755, lon:14.4378, day:25, date:'Jul 16', tag:'City',
    note:'Charles Bridge at dawn — before the crowds arrived.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'vienna', city:'Vienna', country:'Austria', lat:48.2082, lon:16.3738, day:27, date:'Jul 18', tag:'City',
    note:'Belvedere, Schönbrunn, and coffee that demanded to be sat with.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'budapest', city:'Budapest', country:'Hungary', lat:47.4979, lon:19.0402, day:29, date:'Jul 20', tag:'City',
    note:'Thermal baths, ruin bars, and the Danube at golden hour.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1500149150961-f2bddbc3f5e8?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'munich', city:'Munich', country:'Germany', lat:48.1351, lon:11.5820, day:32, date:'Jul 23', tag:'City',
    note:'English Garden, beer halls, a friend\'s floor to sleep on.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'milan', city:'Milan', country:'Italy', lat:45.4654, lon:9.1859, day:35, date:'Jul 26', tag:'City',
    note:'Duomo, Navigli canals, and a couch from a friend.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'barcelona', city:'Barcelona', country:'Spain', lat:41.3851, lon:2.1734, day:39, date:'Jul 30', tag:'Coast',
    note:'Gaudí, the Gothic Quarter, Mediterranean salt in the air.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'madrid', city:'Madrid', country:'Spain', lat:40.4168, lon:-3.7038, day:41, date:'Aug 1', tag:'✦ Sanmao',
    note:'Sanmao studied here at 20. She met José here. The beginning of everything.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'grancanaria', city:'Gran Canaria', country:'Spain', lat:28.1235, lon:-15.4366, day:44, date:'Aug 4', tag:'✦ Sanmao',
    note:'Casa Sanmao in Telde. The Ruta Sanmao trail. José died here in 1979.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1569385210018-127585b96e85?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'laayoune', city:'Laayoune', country:'Western Sahara', lat:27.1418, lon:-13.1873, day:47, date:'Aug 7', tag:'✦ Sanmao',
    note:'She lived here. Married José in the desert here. Wrote Stories of the Sahara here.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569385210018-127585b96e85?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'marrakech', city:'Marrakech', country:'Morocco', lat:31.6295, lon:-7.9811, day:48, date:'Aug 8', tag:'Sahara Tour',
    note:'Atlas Mountains, Aït Benhaddou, then three days into the desert.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569385210018-127585b96e85?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'fes', city:'Fès', country:'Morocco', lat:34.0181, lon:-5.0078, day:54, date:'Aug 14', tag:'Morocco',
    note:'The medina, the tanneries, and a day trip to Roman Volubilis.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1569385210018-127585b96e85?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'chefchaouen', city:'Chefchaouen', country:'Morocco', lat:35.1688, lon:-5.2636, day:57, date:'Aug 17', tag:'Morocco',
    note:'The Blue City. Two days to breathe before the long road home.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1569385210018-127585b96e85?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
    ]},
  { id:'tangier', city:'Tangier', country:'Morocco', lat:35.7595, lon:-5.8340, day:59, date:'Aug 19', tag:'Strait',
    note:'The Strait of Gibraltar. Africa in the rearview, Europe ahead.', link:'gallery.html',
    photos:[
      'https://images.unsplash.com/photo-1569385210018-127585b96e85?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&h=600&fit=crop&q=80',
    ]},
];
window.STOPS = STOPS;

// ─── Warm palette applied to every map layer after load ──────────────────────
function applyWarmPalette(map) {
  map.getStyle().layers.forEach(layer => {
    try {
      // Land background — warm cream
      if (layer.type === 'background') {
        map.setPaintProperty(layer.id, 'background-color', '#EFE3CB');
      }
      // Ocean / lakes / seas — muted dusty blue
      if (layer['source-layer'] === 'water' && layer.type === 'fill') {
        map.setPaintProperty(layer.id, 'fill-color', '#B8CADA');
      }
      // Rivers
      if (layer['source-layer'] === 'waterway' && layer.type === 'line') {
        map.setPaintProperty(layer.id, 'line-color', '#A4BCC9');
      }
      // Country borders — warm dark brown, clearly visible
      if (layer['source-layer'] === 'boundary' && layer.type === 'line') {
        map.setPaintProperty(layer.id, 'line-color', '#8B6B47');
        map.setPaintProperty(layer.id, 'line-opacity', 0.9);
      }
      // All text labels — warm dark ink + force English name
      if (layer.type === 'symbol') {
        map.setPaintProperty(layer.id, 'text-color', '#3D2B1A');
        map.setPaintProperty(layer.id, 'text-halo-color', 'rgba(239,227,203,0.88)');
        map.setPaintProperty(layer.id, 'text-halo-width', 1.5);
        // Use English name, fall back to local name only if no English exists
        map.setLayoutProperty(layer.id, 'text-field',
          ['coalesce', ['get', 'name:en'], ['get', 'name']]
        );
      }
      // Sea / ocean name labels — blue-toned so they read as water
      if (layer['source-layer'] === 'water_name' && layer.type === 'symbol') {
        map.setPaintProperty(layer.id, 'text-color', '#5E8599');
        map.setPaintProperty(layer.id, 'text-halo-color', 'rgba(184,202,218,0.75)');
        map.setPaintProperty(layer.id, 'text-halo-width', 1.5);
      }
    } catch(_) {}
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
window.RouteMap = function RouteMap({ currentStopId, onActiveChange }) {
  const containerRef = React.useRef(null);
  const mapRef       = React.useRef(null);
  const markersRef   = React.useRef([]);
  const [active,  setActive]  = React.useState(() => {
    const i = STOPS.findIndex(s => s.id === currentStopId);
    return i >= 0 ? i : 0;
  });
  const [playing,   setPlaying]   = React.useState(false);
  const [ready,     setReady]     = React.useState(false);
  const [error,     setError]     = React.useState(false);
  const [tourPhase, setTourPhase] = React.useState('idle'); // 'idle' | 'flying' | 'arrived'

  const routeBounds = () => {
    const lons = STOPS.map(s => s.lon);
    const lats = STOPS.map(s => s.lat);
    return [
      [Math.min(...lons) - 3, Math.min(...lats) - 3],
      [Math.max(...lons) + 3, Math.max(...lats) + 3],
    ];
  };

  // ── Init map ──────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container:         containerRef.current,
      style:             'https://tiles.openfreemap.org/styles/positron',
      bounds:            routeBounds(),
      fitBoundsOptions:  { padding: 50 },
      scrollZoom:        true,
      keyboard:          true,
      attributionControl: false,
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('error', () => setError(true));

    map.on('load', () => {
      applyWarmPalette(map);

      // Route line source
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: STOPS.map(s => [s.lon, s.lat]) },
        },
      });

      // Main dashed line
      map.addLayer({
        id: 'route-line', type: 'line', source: 'route',
        paint: { 'line-color': '#c14a2a', 'line-width': 2.5, 'line-opacity': 0.9, 'line-dasharray': [8, 6] },
      });

      mapRef.current = map;
      setReady(true);
    });

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // ── Markers (rebuild on active / currentStopId change) ────────────
  React.useEffect(() => {
    if (!ready || !mapRef.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    STOPS.forEach((stop, i) => {
      const isCurrent = stop.id === currentStopId;
      const isActive  = i === active;

      const el = document.createElement('div');
      el.className = `pin${isCurrent ? ' is-current' : ''}${isActive ? ' is-active' : ''}`;
      el.innerHTML = `
        ${isCurrent ? '<span class="pin-halo"></span><span class="pin-halo pin-halo-2"></span>' : ''}
        <span class="pin-dot"></span>
        <span class="pin-label">${stop.city.toUpperCase()}</span>
        ${isCurrent ? '<span class="pin-now">SHIN IS HERE</span>' : ''}
      `;
      el.addEventListener('click', () => { setPlaying(false); setActive(i); });

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([stop.lon, stop.lat])
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });
  }, [ready, active, currentStopId]);

  // ── Fly to active stop (manual only — tour manages its own camera) ─
  React.useEffect(() => {
    if (!mapRef.current || playing) return;
    if (onActiveChange) onActiveChange(STOPS[active]);
    const s = STOPS[active];
    mapRef.current.flyTo({ center: [s.lon, s.lat], zoom: 4.5, duration: 2200, essential: true });
  }, [active, ready]);

  // ── Cinematic tour sequence per stop ─────────────────────────────
  //
  //   0ms      : zoom INTO city streets (zoom 9.5, 900ms)
  //   900ms    : mosaic pops in — photos fill the screen
  //   3600ms   : mosaic fades, camera zooms out + glides to next stop
  //   6800ms   : setActive → effect re-runs at next city
  //
  React.useEffect(() => {
    if (!playing || !ready) { setTourPhase('idle'); return; }

    const s       = STOPS[active];
    const nextIdx = (active + 1) % STOPS.length;
    const next    = STOPS[nextIdx];

    // Step 1 — smooth zoom into the city (same speed & curve as zoom-out)
    setTourPhase('zooming');
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [s.lon, s.lat], zoom: 9, duration: 1600, curve: 0.5, essential: true });
    }

    // Step 2 — photos appear after zoom lands
    const t1 = setTimeout(() => setTourPhase('arrived'), 1600);

    // Step 3 — mosaic fades, pull back and glide to next city
    const t2 = setTimeout(() => {
      setTourPhase('departing');
      const src = mapRef.current && mapRef.current.getSource('route');
      if (src) src.setData({
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: STOPS.slice(0, nextIdx + 1).map(s => [s.lon, s.lat]) },
      });
      if (mapRef.current) {
        mapRef.current.flyTo({ center: [next.lon, next.lat], zoom: 4.5, duration: 1600, curve: 0.5, essential: true });
      }
    }, 4300); // 1600 zoom + 2700 mosaic display

    // Step 4 — advance when glide finishes
    const t3 = setTimeout(() => setActive(nextIdx), 5900); // 4300 + 1600

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [playing, active, ready]);

  const cur     = STOPS[active];
  const curStop = STOPS.find(s => s.id === currentStopId) || STOPS[STOPS.length - 1];

  return (
    <div>
      <div className="map-head">
        <div>
          <div className="label" style={{marginBottom:8}}>The Route · 9 stops · 7,400 km overland</div>
          <h2 className="display"><i>Fly</i> across the journey</h2>
        </div>
        <div className="map-controls">
          <button className="btn ghost" onClick={() => setPlaying(p => !p)}>
            {playing ? '❚❚ Pause' : '▶ Auto-tour'}
          </button>
          <button className="btn" onClick={() => {
            setPlaying(false);
            setActive(Math.floor(Math.random() * STOPS.length));
          }}>Surprise me</button>
          <button className="btn ghost" onClick={() => {
            setPlaying(false);
            mapRef.current && mapRef.current.fitBounds(routeBounds(), { padding: 50, duration: 1600 });
          }}>Fit route</button>
        </div>
      </div>

      <div className="map-stage">
        {!ready && !error && (
          <div className="map-loading">
            <div className="map-spinner" />
            <p>Loading map…</p>
          </div>
        )}
        {error && (
          <div className="map-error">
            <strong>Map tiles unavailable</strong>
            <p>Check your internet connection and refresh the page.<br/>The map loads from OpenFreeMap's servers.</p>
          </div>
        )}

        {/* Gliding indicator — shows while camera travels to next stop */}
        {playing && tourPhase === 'departing' && (
          <div className="tour-flying">
            <span className="tour-flying-dot" />
            On the road to {STOPS[(active + 1) % STOPS.length].city}…
          </div>
        )}

        {/* Photo mosaic — fills the map, squares pop in one by one */}
        {playing && tourPhase === 'arrived' && (
          <div className="tour-mosaic" key={active}>
            <div className="tour-mosaic-grid">
              {cur.photos.map((src, i) => (
                <a key={i} href={cur.link} className="tour-mosaic-tile" style={{animationDelay: `${i * 90}ms`}}>
                  <img src={src} alt={`${cur.city} ${i + 1}`} />
                </a>
              ))}
            </div>
            <div className="tour-mosaic-footer">
              <div>
                <div className="tour-mosaic-city">{cur.city}</div>
                <div className="tour-mosaic-meta">Day {String(cur.day).padStart(3,'0')} · {cur.country} · {cur.date}</div>
              </div>
              <a href={cur.link} className="tour-mosaic-btn">View album →</a>
            </div>
          </div>
        )}

        <div ref={containerRef} className="leaflet-host" />
        <div className="map-corner-stamp">
          <div className="mcs-inner">
            <div className="mcs-label">Last update</div>
            <div className="mcs-day">Day {String(curStop.day).padStart(3,'0')}</div>
            <div className="mcs-loc">{curStop.city}, {curStop.country}</div>
            <div className="mcs-date">{curStop.date} · 2026</div>
          </div>
        </div>
      </div>

      <div className="map-legend">
        <div className="leg-pins">
          {STOPS.map((s, i) => (
            <button key={s.id}
              className={`leg-pin${i === active ? ' active' : ''}${s.id === currentStopId ? ' current' : ''}`}
              onClick={() => { setPlaying(false); setActive(i); }}>
              <span className="dot" style={{background: s.id === currentStopId ? 'var(--accent)' : (i === active ? 'currentColor' : 'var(--accent2)')}} />
              <span>{s.city}{s.id === currentStopId ? ' ●' : ''}</span>
            </button>
          ))}
        </div>
        <div style={{display:'flex', gap:18, alignItems:'center'}}>
          <span style={{opacity:.6}}>Day {String(cur.day).padStart(3,'0')} · {cur.date}</span>
          <span style={{color:'var(--accent)'}}>{cur.tag}</span>
        </div>
      </div>

      <div style={{
        marginTop:24, display:'grid', gridTemplateColumns:'auto 1fr auto',
        gap:24, alignItems:'center', borderTop:'1.25px solid var(--fg)', paddingTop:18
      }}>
        <div style={{fontFamily:'var(--display)', fontSize:48, lineHeight:1, fontStyle:'italic'}}>
          {String(active+1).padStart(2,'0')}/{String(STOPS.length).padStart(2,'0')}
        </div>
        <div>
          <div className="label" style={{marginBottom:6}}>{cur.country} · Day {cur.day}</div>
          <div style={{fontFamily:'var(--display)', fontSize:'clamp(22px,2.2vw,30px)', lineHeight:1.25, textWrap:'pretty', maxWidth:'56ch'}}>
            "{cur.note}"
          </div>
        </div>
        <button className="btn" onClick={() => setActive(a => (a + 1) % STOPS.length)}>Next →</button>
      </div>
    </div>
  );
};

// ─── Render ──────────────────────────────────────────────────────────────────
// Update CURRENT_STOP_ID to move the "SHIN IS HERE" marker.
// IDs: beijing | zamynuud | ulaanbaatar | baikal | moscow | berlin | rome | barcelona | tangier | marrakech
const CURRENT_STOP_ID = 'baikal';

const _mapRoot = document.getElementById('route-map-root');
if (_mapRoot) {
  ReactDOM.createRoot(_mapRoot).render(
    React.createElement(window.RouteMap, { currentStopId: CURRENT_STOP_ID })
  );
}
