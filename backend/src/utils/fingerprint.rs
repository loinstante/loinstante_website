use hmac::{Hmac, Mac};
use sha2::Sha256;

// HMAC-SHA256
type HmacSha256 = Hmac<Sha256>;

pub fn partial_ip(ip: &str) -> &str {
    // naive partial: take first 3 octets for IPv4 or first segment for IPv6
    if ip.contains('.') {
        // IPv4
        let parts: Vec<&str> = ip.split('.').collect();
        if parts.len() >= 3 {
            return &ip[..ip.rfind('.').unwrap_or(ip.len())];
        }
        ip
    } else {
        // IPv6 or unknown - take first segment
        ip.split(':').next().unwrap_or(ip)
    }
}

pub fn compute_fingerprint(user_agent: &str, ip: &str, secret: &str) -> String {
    let ip_part = partial_ip(ip);
    let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).expect("HMAC can take key of any size");
    mac.update(user_agent.as_bytes());
    mac.update(b"|");
    mac.update(ip_part.as_bytes());
    let result = mac.finalize();
    let code_bytes = result.into_bytes();
    hex::encode(code_bytes)
}

