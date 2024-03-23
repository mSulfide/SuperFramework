Template.prototype.graph3DTemplate = () => `
    <canvas id='graph3DCanvas'></canvas>
    <div>
        <input type="checkbox" data-custom="drawPoints" id="drawPoints">Точки</input>
        <input type="checkbox" data-custom="drawEdges" id="drawEdges">Рёбра</input>
        <input type="checkbox" data-custom="drawPolygons" id="drawPolygons" checked>Полигоны</input>
    </div>
    <select id="selectedSurface">
        <option value="cube" selected="selected">Куб</option>
        <option value="sphere">Сфера</option>
        <option value="torus">Тор</option>
    </select>
`;