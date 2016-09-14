#version 330
#extension GL_ARB_shading_language_420pack : enable
#extension GL_ARB_explicit_uniform_location : enable

in vec2 UV;
in vec3 Position_worldspace;
in vec3 EyeDirection_cameraspace;
in vec3 LightDirection_cameraspace;
in vec3 LightDirection_tangentspace;
in vec3 EyeDirection_tangentspace;

out vec3 color;

layout(binding=0) uniform sampler2D DiffuseTextureSampler;
layout(binding=1) uniform sampler2D NormalTextureSampler;
uniform vec3 LightPosition_worldspace;

void main(){
    vec3 LightColor = vec3(1,1,1);
    float LightPower = 2.0;
    
    // Material properties
    vec3 texColor = texture( DiffuseTextureSampler, UV ).rgb;
    vec3 MaterialDiffuseColor = vec3(0.2,0,0.6) * length(texColor);
    vec3 MaterialAmbientColor = vec3(0,0,0);
    vec3 MaterialSpecularColor = vec3(0.2,0.2,0.2);

    vec3 TextureNormal_tangentspace = normalize(texture( NormalTextureSampler, vec2(UV.x,UV.y) ).rgb*2.0 - 1.0);
    
    //float distance = length( LightPosition_worldspace - Position_worldspace );

    vec3 n = TextureNormal_tangentspace;
    vec3 l = normalize(LightDirection_tangentspace);
    float cosTheta = clamp( dot( n,l ), 0,1 );
    
    color = 
        MaterialAmbientColor
        +MaterialDiffuseColor * LightColor * LightPower * cosTheta 
        ;
}