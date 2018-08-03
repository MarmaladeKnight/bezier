"use strict"

import b4w from "blend4web";

var m_app     = b4w.app;
var m_cfg     = b4w.config;
var m_data    = b4w.data;
var m_geom    = b4w.geometry;
var m_mat     = b4w.material;
var m_scs     = b4w.scenes;
var m_obj     = b4w.objects;
var m_trans   = b4w.transform;
var m_version = b4w.version;
var m_rgba    = b4w.rgba;

var DEBUG = (m_version.type() === "DEBUG");

var APP_ASSETS_PATH = "./assets/";

export function init() {
    m_app.init({
        canvas_container_id:"b4w",
        callback: init_cb,
        physics_enabled: false,
        show_fps: false,
        alpha: false,
        gl_debug: true,
        autoresize: true,
        assets_dds_available: !DEBUG,
        assets_min50_available: !DEBUG,
        console_verbose: true
    });
}

function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }
    load();
}

function load() {
    m_data.load(APP_ASSETS_PATH + "lines.json", load_cb);
}

function load_cb(data_id) {
    m_app.enable_camera_controls(false, false, false, null, true);
}

export function draw_lines(points) {
    var bezier = m_scs.get_object_by_name("Line1");

    m_mat.set_line_params(bezier, {
        width: 10,
        color: new Float32Array([1.0, 0.0, 0.0, 1.0]),
    });

    m_geom.draw_line(bezier, points, true);
}

init();