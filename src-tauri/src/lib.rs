use std::process::Command;
use std::env;
use std::os::windows::process::CommandExt;

#[tauri::command]
async fn check_process_running(process_name: String) -> Result<bool, String> {    
    let output = Command::new("tasklist")
        .arg("/FI")
        .arg(format!("IMAGENAME eq {}", process_name))
        .arg("/FO")
        .arg("CSV")
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag to prevent command prompt from showing
        .output()
        .map_err(|e| e.to_string())?;
    
    let output_str = String::from_utf8_lossy(&output.stdout);
    let is_running = output_str.contains(&process_name);
    
    Ok(is_running)
}

#[tauri::command]
async fn set_run_at_startup(enable: bool) -> Result<(), String> {
    let app_name = "Statizen";
    let app_path = env::current_exe().map_err(|e| e.to_string())?;
    let _startup_key = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run";
    
    if enable {
        // Add to startup registry
        let output = Command::new("reg")
            .args(&["add", "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", "/v", app_name, "/t", "REG_SZ", "/d", &app_path.to_string_lossy(), "/f"])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW flag
            .output()
            .map_err(|e| e.to_string())?;
        
        if !output.status.success() {
            return Err("Failed to add to startup".to_string());
        }
    } else {
        // Remove from startup registry
        let output = Command::new("reg")
            .args(&["delete", "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", "/v", app_name, "/f"])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW flag
            .output()
            .map_err(|e| e.to_string())?;
        
        if !output.status.success() {
            return Err("Failed to remove from startup".to_string());
        }
    }
    
    Ok(())
}

#[tauri::command]
async fn check_run_at_startup() -> Result<bool, String> {
    let app_name = "Statizen";
    let output = Command::new("reg")
        .args(&["query", "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", "/v", app_name])
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag
        .output()
        .map_err(|e| e.to_string())?;
    
    let is_enabled = output.status.success();
    
    Ok(is_enabled)
}

#[tauri::command]
async fn minimize_window() -> Result<(), String> {
    // This will be handled by the window API
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![check_process_running, set_run_at_startup, check_run_at_startup, minimize_window])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
