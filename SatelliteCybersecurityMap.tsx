import { useMemo, useRef, useState } from "react";
import { AlertTriangle, Crosshair, MapPin, Minus, Plus, Radio, RotateCcw, Satellite, ShieldCheck, Wifi } from "lucide-react";

type ScenarioId = "command" | "pattern" | "login";
type NodeType = "satellite" | "station";
type NodeStatus = "secure" | "review" | "threat";

type MapNode = {
  id: string;
  type: NodeType;
  name: string;
  x: number;
  y: number;
  orbit?: string;
  location?: string;
  status: NodeStatus;
  connection: string;
  activity: string;
};

type MapCopy = {
  mapEyebrow: string;
  mapTitle: string;
  mapIntro: string;
  interactive: string;
  panHint: string;
  legend: string;
  safe: string;
  review: string;
  threat: string;
  satellites: string;
  groundStations: string;
  clickDetails: string;
  synthetic: string;
  threatBanner: string;
  clearThreat: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  connection: string;
  lastActivity: string;
  status: string;
  close: string;
};

const nodes: MapNode[] = [
  { id: "sat-07", type: "satellite", name: "SAT-07 / Aster", x: 284, y: 96, orbit: "LEO-2", status: "secure", connection: "UHF / encrypted simulation", activity: "Telemetry heartbeat · 14:32:08" },
  { id: "sat-12", type: "satellite", name: "SAT-12 / Noor", x: 520, y: 120, orbit: "LEO-3", status: "secure", connection: "S-band / encrypted simulation", activity: "Orbital pass update · 14:28:54" },
  { id: "sat-21", type: "satellite", name: "SAT-21 / Horizon", x: 690, y: 260, orbit: "MEO-1", status: "secure", connection: "X-band / encrypted simulation", activity: "Packet batch normalized · 14:30:17" },
  { id: "sat-04", type: "satellite", name: "SAT-04 / Rihla", x: 540, y: 424, orbit: "LEO-1", status: "secure", connection: "UHF / encrypted simulation", activity: "Link quality check · 14:27:10" },
  { id: "gs-riy", type: "station", name: "GS-RIY-02 / Riyadh", x: 196, y: 360, location: "Saudi Arabia · synthetic", status: "secure", connection: "Fiber uplink / simulated", activity: "Handshake verified · 14:31:42" },
  { id: "gs-nor", type: "station", name: "GS-NOR-01 / North", x: 804, y: 150, location: "Arctic corridor · synthetic", status: "secure", connection: "Microwave / simulated", activity: "Pass window reserved · 14:26:02" },
  { id: "gs-pac", type: "station", name: "GS-PAC-03 / Pacific", x: 850, y: 390, location: "Pacific corridor · synthetic", status: "secure", connection: "Fiber uplink / simulated", activity: "Key rotation complete · 14:25:41" },
];

const links = [
  ["sat-07", "gs-riy"], ["sat-07", "gs-nor"], ["sat-12", "gs-nor"], ["sat-12", "gs-riy"], ["sat-21", "gs-pac"], ["sat-21", "gs-nor"], ["sat-04", "gs-riy"], ["sat-04", "gs-pac"], ["sat-07", "sat-12"], ["sat-12", "sat-21"], ["sat-21", "sat-04"],
] as const;

export default function SatelliteCybersecurityMap({ scenario, copy }: { scenario: ScenarioId | null; copy: MapCopy }) {
  const [selected, setSelected] = useState<MapNode | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const mapNodes = useMemo(() => nodes.map((node) => {
    if (scenario === "command" && node.id === "sat-07") return { ...node, status: "threat" as NodeStatus };
    if (scenario === "pattern" && (node.id === "sat-12" || node.id === "sat-21")) return { ...node, status: "review" as NodeStatus };
    if (scenario === "login" && node.id === "gs-pac") return { ...node, status: "threat" as NodeStatus };
    return node;
  }), [scenario]);
  const lookup = (id: string) => mapNodes.find((node) => node.id === id)!;
  const activeLink = (a: string, b: string) => (scenario === "command" && (a === "sat-07" || b === "sat-07")) || (scenario === "pattern" && (a === "sat-12" || b === "sat-12")) || (scenario === "login" && (a === "gs-pac" || b === "gs-pac"));
  const resetView = () => { setScale(1); setOffset({ x: 0, y: 0 }); };
  const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => { (event.currentTarget as Element).setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y }; };
  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => { if (!drag.current) return; setOffset({ x: drag.current.ox + event.clientX - drag.current.x, y: drag.current.oy + event.clientY - drag.current.y }); };
  const endDrag = () => { drag.current = null; };
  const colorFor = (status: NodeStatus) => status === "threat" ? "#ff6b6b" : status === "review" ? "#f5b94c" : "#63e6ff";
  const statusLabel = (status: NodeStatus) => status === "threat" ? copy.threat : status === "review" ? copy.review : copy.safe;

  return <article className="panel orbital-map-panel" id="satellite-map">
    <div className="map-panel-header">
      <div><span className="panel-kicker"><Crosshair size={14} />{copy.mapEyebrow}</span><h3>{copy.mapTitle}</h3><p>{copy.mapIntro}</p></div>
      <div className="map-header-tools"><span className="map-live"><span />{copy.interactive}</span><div className="map-zoom"><button onClick={() => setScale((value) => Math.min(1.7, value + .15))} aria-label={copy.zoomIn}><Plus size={14} /></button><button onClick={() => setScale((value) => Math.max(.72, value - .15))} aria-label={copy.zoomOut}><Minus size={14} /></button><button onClick={resetView} aria-label={copy.resetView}><RotateCcw size={13} /></button></div></div>
    </div>
    <div className={`map-stage ${scenario ? `map-alert-${scenario}` : ""}`}>
      <svg viewBox="0 0 1000 520" role="img" aria-label={copy.mapTitle} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onWheel={(event) => { event.preventDefault(); setScale((value) => Math.max(.72, Math.min(1.7, value + (event.deltaY > 0 ? -.08 : .08)))); }}>
        <defs>
          <radialGradient id="mapEarth" cx="35%" cy="28%"><stop offset="0" stopColor="#4fc8ec" stopOpacity=".9" /><stop offset=".46" stopColor="#1b7199" stopOpacity=".9" /><stop offset="1" stopColor="#061426" /></radialGradient>
          <linearGradient id="mapOcean" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0c304b" /><stop offset="1" stopColor="#07101e" /></linearGradient>
          <filter id="mapGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#73d9ff" strokeOpacity=".08" strokeWidth="1" /></pattern>
        </defs>
        <g transform={`translate(${offset.x} ${offset.y}) scale(${scale})`}>
          <rect x="50" y="32" width="900" height="450" rx="18" fill="url(#mapOcean)" stroke="#82dfff" strokeOpacity=".12" />
          <rect x="50" y="32" width="900" height="450" rx="18" fill="url(#mapGrid)" />
          <g className="map-orbits"><ellipse cx="500" cy="260" rx="322" ry="142" transform="rotate(-14 500 260)" /><ellipse cx="500" cy="260" rx="255" ry="214" transform="rotate(34 500 260)" /><ellipse cx="500" cy="260" rx="180" ry="285" transform="rotate(67 500 260)" /></g>
          <circle cx="500" cy="260" r="160" fill="url(#mapEarth)" stroke="#63e6ff" strokeOpacity=".45" strokeWidth="2" filter="url(#mapGlow)" />
          <circle cx="500" cy="260" r="160" fill="none" stroke="#7ff3c7" strokeOpacity=".25" strokeWidth="3" strokeDasharray="24 16" className="map-earth-scan" />
          <path d="M420 160c40-28 78-20 94 11 18 35 58 19 78 43 19 22-2 49-21 57-20 9-25 47-65 39-37-8-47 20-81 2-34-17-57-54-47-86 7-22 14-46 42-66Z" fill="#78e1b2" fillOpacity=".2" />
          <path d="M548 294c22-22 45-22 63-5 19 18 55 5 62 32 9 34-25 46-42 66-18 20-18 49-49 53-31 4-44-28-65-42-21-15-25-48-3-65Z" fill="#68cfe6" fillOpacity=".18" />
          <g className="map-links">{links.map(([from, to], index) => { const a = lookup(from); const b = lookup(to); const alert = activeLink(from, to); const status = alert ? (scenario === "pattern" ? "review" : "threat") : "secure"; return <line key={`${from}-${to}`} className={`map-link ${alert ? "active" : ""}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={colorFor(status)} strokeOpacity={alert ? .95 : .34} strokeWidth={alert ? 2.7 : 1.2} strokeDasharray={alert ? "10 7" : "4 10"} style={{ animationDelay: `${index * -.34}s` }} />; })}</g>
          <g className="map-nodes">{mapNodes.map((node) => <g key={node.id} className={`map-node ${node.status}`} transform={`translate(${node.x} ${node.y})`} onClick={(event) => { event.stopPropagation(); setSelected(node); }} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(node); }}><circle className="node-pulse" r={node.type === "station" ? 17 : 21} stroke={colorFor(node.status)} /><circle r={node.type === "station" ? 9 : 12} fill="#081727" stroke={colorFor(node.status)} strokeWidth="2" />{node.type === "station" ? <path d="M-5 5V-1a5 5 0 0 1 10 0v6M-8 5h16" fill="none" stroke={colorFor(node.status)} strokeWidth="1.8" /> : <Satellite size={16} x={-8} y={-8} color={colorFor(node.status)} />}</g>)}</g>
          <g className="map-labels">{mapNodes.map((node) => <text key={`${node.id}-label`} x={node.x + 17} y={node.y - 16} fill={colorFor(node.status)}>{node.id.toUpperCase()}</text>)}</g>
          {scenario && <g className="map-threat-callout" transform={`translate(${scenario === "login" ? 694 : scenario === "pattern" ? 530 : 296} ${scenario === "login" ? 420 : scenario === "pattern" ? 60 : 62})`}><rect width="218" height="42" rx="4" /><AlertTriangle size={15} x="12" y="13" /><text x="34" y="18">{copy.threatBanner}</text><text x="34" y="32">{scenario === "command" ? "SAT-07 / uplink path" : scenario === "pattern" ? "SAT-12 / traffic path" : "GS-PAC-03 / access path"}</text></g>}
        </g>
      </svg>
      <div className="map-pan-hint"><Crosshair size={12} />{copy.panHint}</div>
      {selected && <div className="map-detail-card"><div className="map-detail-top"><div className={`map-detail-icon ${selected.status}`}>{selected.type === "station" ? <Radio size={17} /> : <Satellite size={17} />}</div><button onClick={() => setSelected(null)} aria-label={copy.close}>×</button></div><span className="map-detail-type">{selected.type === "station" ? copy.groundStations : copy.satellites}</span><h4>{selected.name}</h4><span className={`map-detail-status ${selected.status}`}><span />{statusLabel(selected.status)}</span><div className="map-detail-row"><Wifi size={13} /><span>{copy.connection}</span><strong>{selected.connection}</strong></div><div className="map-detail-row"><Radio size={13} /><span>{copy.lastActivity}</span><strong>{selected.activity}</strong></div>{selected.location && <div className="map-detail-row"><MapPin size={13} /><span>Location</span><strong>{selected.location}</strong></div>}<div className="map-detail-footer"><ShieldCheck size={13} />{copy.synthetic}</div></div>}
    </div>
    <div className="map-footer"><div className="map-legend"><span className="legend-title">{copy.legend}</span><span><i className="map-legend-dot safe" />{copy.safe}</span><span><i className="map-legend-dot review" />{copy.review}</span><span><i className="map-legend-dot threat" />{copy.threat}</span><span><Satellite size={13} />{copy.satellites}</span><span><Radio size={13} />{copy.groundStations}</span></div><span className="map-data-note"><ShieldCheck size={13} />{copy.synthetic}</span></div>
  </article>;
}
