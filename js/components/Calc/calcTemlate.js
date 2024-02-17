Template.prototype.calcTemplate = () => `
    <textarea id = 'a' placeholder="a"></textarea>
    <textarea id = 'b' placeholder="b"></textarea>
    <textarea id = 'c' placeholder="result"></textarea>
    <button class="operand" data-operand="add">+</button>
    <button class="operand" data-operand="sub">-</button>
    <button class="operand" data-operand="mult">*</button>
    <button class="operand" data-operand="div">/</button>
    <button class="operand" data-operand="pow">^</button>
`;