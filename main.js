import { Grid } from "./classes/Grid.js";

// Basic setup of Canvas
const canvas = document.getElementById('life-zone');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// Setup of Grid
const grid = new Grid(15, ctx);
grid.draw();
grid.animate();