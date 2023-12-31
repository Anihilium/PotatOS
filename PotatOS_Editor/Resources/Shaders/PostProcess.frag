#version 330 core

out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D scene;
uniform sampler2D bloomBuffer;

uniform float exposure;
uniform bool bloom;

void main()
{             
    const float gamma = 2.2;
    vec3 hdrColor = texture(scene, TexCoords).rgb;
    vec3 bloomColor = texture(bloomBuffer, TexCoords).rgb;

    if(bloom)
    {
        hdrColor += bloomColor;
    }
    
    // HDR - Tone Mapping : Exposure
    vec3 result = vec3(1.0) - exp(-hdrColor * exposure);
    
    // Gamma Correction       
    result = pow(result, vec3(1.0 / gamma));
    
    FragColor = vec4(result, 1.0);
}
