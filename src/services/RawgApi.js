import {todayDate} from "../utils/utils.jsx";

/** @module services/RawgApi */

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY; 

/**
 * Juego devuelto por los endpoints de listados de RAWG
 * @typedef {Object} RawgGame
 * @property {number} id Identificador del juego
 * @property {string} name Nombre del juego
 * @property {string} [background_image] URL de la imagen principal
 * @property {number} [playtime] Tiempo medio de juego en horas
 * @property {number} [rating] Puntuación media
 * @property {string} [description] Descripción del juego
 */

/**
 * Ejecuta una petición GET a la API de RAWG
 * @param {string} endpoint Ruta del recurso solicitado
 * @param {string} [params=""] Parámetros adicionales de consulta, precedidos por '&'
 * @returns {Promise<Object>} Cuerpo de la respuesta en formato JSON
 * @throws {Error} Si la respuesta HTTP indica un error
 */
const fetchFromRawg = async (endpoint, params = "") => {
  const url = `${BASE_URL}${endpoint}?key=${API_KEY}${params}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en la petición RAWG: ${response.statusText}`);
  } //Agrega un manejo de errores
  return await response.json();
};


/** Consultas disponibles para obtener datos de juegos de RAWG. @namespace rawgService */
export const rawgService = {

  /**
   * Obtiene juegos con fecha de lanzamiento de hoy para la página de inicio
   * @param {string} [ordering="-released"] Orden de los resultados por fecha de lanzamiento
   * @param {number} [limit=5] Cantidad máxima de juegos
   * @returns {Promise<RawgGame[]>} Juegos encontrados
   */
  getHomeGames: async (ordering = "-released", limit = 5) => {
    const today = todayDate;
    const data = await fetchFromRawg("/games", `&dates=${today},${today}&page_size=${limit}&ordering=${ordering}`);
    return data.results;
  },


  /**
   * Obtiene los juegos mejor valorados desde el inicio del mes hasta una fecha
   * @param {string} givenDate Fecha final en formato 'YYYY-MM-DD'
   * @param {number} [limit] Cantidad máxima de juegos
   * @returns {Promise<RawgGame[]>} Juegos ordenados por puntuación de Metacritic
   */
  getMonthlyTop: async (givenDate, filterUrl, limit = 10) => { 
    const seconday = givenDate || todayDate();
    const firstday = `${seconday.substring(0, 7)}-01`; 
    const filter = filterUrl ? `&${filterUrl}` : "";
    const data = await fetchFromRawg("/games", `&dates=${firstday},${seconday}${filter}&ordering=-metacritic&page_size=${limit}`);
    return data.results;
  },

  /**
   * Obtiene el ranking mensual y completa los detalles de cada juego en paralelo
   * @param {string} givenDate Fecha final en formato 'YYYY-MM-DD'
   * @param {string} filterUrl Filtros adicionales de RAWG
   * @param {number} [limit=10] Cantidad máxima de juegos
   * @returns {Promise<RawgGame[]>} Juegos con sus detalles completos
   */
  getMonthlyTopDetails: async (givenDate, filterUrl, limit = 10) => {
    const games = await rawgService.getMonthlyTop(givenDate, filterUrl, limit);
    const gamesToLoad = games.length > 0 ? games : await rawgService.getBackupGames();
    return Promise.all(
      gamesToLoad.map((game) => rawgService.getGameDetails(game.id))
    );
  },


  /**
   * Obtiene los juegos mejor valorados desde el inicio del año para ver sus desarrolladores
   * @param {string} givenDate Fecha final en formato 'YYYY-MM-DD'
   * @param {number} [limit] Cantidad máxima de juegos
   * @returns {Promise<RawgGame[]>} Juegos ordenados por puntuación de Metacritic
   */
  getDevelopersTop: async (givenDate, filterUrl, limit = 10) => {
    const seconday = givenDate || todayDate();
    const firstday = `${seconday.substring(0, 4)}-01-01`; 
    const filter = filterUrl ? `&${filterUrl}` : "";
    const data = await fetchFromRawg("/games", `&dates=${firstday},${seconday}${filter}&ordering=-metacritic&page_size=${limit}`);
    return data.results;
  },


  /**
   * Obtiene los juegos del mes hasta una fecha, ordenados por lanzamiento
   * @param {string} givenDate Fecha final en formato 'YYYY-MM-DD'
   * @returns {Promise<RawgGame[]>} Juegos encontrados del mes
   */
  getMonthlyGames: async (givenDate, filterUrl) => {
    const secondDay = givenDate || todayDate();
    const firstDay = `${secondDay.substring(0, 7)}-01`;
    const filter = filterUrl ? `&${filterUrl}` : "";
    const data = await fetchFromRawg("/games", `&dates=${firstDay},${secondDay}${filter}&ordering=-released`);
    return data.results;
  },


  /**
   * Obtiene tres juegos aleatorios
   * @returns {Promise<RawgGame[]>} Juegos de respaldo
   */
  getBackupGames: async ()=>{
    const randomPage = Math.floor(Math.random() * 25) + 1;
    const data = await fetchFromRawg("/games", `&page=${randomPage}&page_size=3`);
    return data.results;
  },


  /**
   * Obtiene los detalles de un juego
   * @param {number|string} id Identificador del juego en RAWG
   * @returns {Promise<RawgGame>} Datos del juego
   */
  getGameDetails: async (id) => {
    return await fetchFromRawg(`/games/${id}`);
  },


  getGameGenres: async () => {
    const data = await fetchFromRawg(`/genres`);
    return data.results;
  },

  getGamePlatforms: async () => {
    const data = await fetchFromRawg(`/platforms`);
    return data.results;
  },
};
