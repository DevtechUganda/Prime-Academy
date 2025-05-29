import React from "react";
import "./MedicalModule.css"; // Re-using for consistent design

export default function EngineeringCoreComponents() {
  return (
    <div className="medical-module">
      <h2>Core Engineering Components</h2>
      <ol>
        <li>
          <b>Geo-Distributed Service Mesh</b>
          <pre className="code-block">
{`python
class RegionalServicePod:
    def __init__(self, region):
        self.region = region
        self.k8s_cluster = KubernetesCluster(region)
        self.local_db = CockroachDB(region)  # Geo-partitioned
        self.cache = Redis(region)
        self.compliance = ComplianceAdapter(region)
    
    def handle_request(self, request):
        # Validate compliance first
        if not self.compliance.validate(request):
            return ErrorResponse("REGULATORY_BLOCK")
            
        # Route to appropriate service
        if request.type == "MATCHING":
            return MatchingEngine(request).process()
        elif request.type == "LEARNING":
            return CourseService(request).process()
        # ... other services
`}
          </pre>
        </li>
        <li>
          <b>Medical Data Processing Pipeline</b>
          <div className="integration-placeholder">[Diagram Placeholder]</div>
          <pre className="code-block">
{`# Code for medical data ingestion, anonymization, validation, enrichment, storage`}
          </pre>
        </li>
        <li>
          <b>Real-Time Matching Engine</b>
          <pre className="code-block">
{`go
package matching

func Match(user User) []Opportunity {
    // 1. Get location context
    geoCtx := location.GetContext(user.Coords)
    
    // 2. Fetch relevant opportunities
    opps := OpportunityDB.Query(
        Location: geoCtx.GetSearchRadius(),
        Filters: user.Preferences,
        Compliance: geoCtx.GetRegulations()
    )
    
    // 3. AI ranking
    userVector := ai.EmbedUser(user)
    ranked := Ranker{
        Strategy: "medical_specialty_weighted",
        Weights: map[string]float32{
            "skill_match": 0.4,
            "location": 0.3,
            "salary": 0.2,
            "prestige": 0.1
        }
    }.Sort(userVector, opps)
    
    return ranked[:50]
}
`}
          </pre>
        </li>
      </ol>

      <h3>🗃️ Data Architecture Specification</h3>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>Data Type</th>
            <th>Storage Solution</th>
            <th>Partitioning</th>
            <th>Access Pattern</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User Profiles</td>
            <td>CockroachDB</td>
            <td>By region</td>
            <td>Frequent reads/writes</td>
          </tr>
          <tr>
            <td>Medical Content</td>
            <td>MongoDB Sharded Cluster</td>
            <td>By specialty</td>
            <td>Rich document queries</td>
          </tr>
          <tr>
            <td>Job/Internship Listings</td>
            <td>Elasticsearch</td>
            <td>Geohash partitioning</td>
            <td>Spatial + text search</td>
          </tr>
          <tr>
            <td>Knowledge Graph</td>
            <td>Neo4j + JanusGraph</td>
            <td>None</td>
            <td>Graph traversals</td>
          </tr>
          <tr>
            <td>AI Embeddings</td>
            <td>Pinecone</td>
            <td>By region + specialty</td>
            <td>Vector similarity</td>
          </tr>
          <tr>
            <td>Audit Trails</td>
            <td>Blockchain (Hyperledger Fabric)</td>
            <td>None</td>
            <td>Append-only</td>
          </tr>
        </tbody>
      </table>

      <h3>🧠 AI/ML System Design</h3>
      <pre className="code-block">
{`python
def train_medical_model():
    # Domain-specific pretraining
    base_model = MedBERT.from_pretrained("medical-bert-base")
    
    # Continue training with medical corpus
    base_model.continue_pretraining(
        datasets=[
            PubMedDataset(2M_articles),
            ClinicalNotesDataset(500K_notes),
            MedicalTextbooks(5K_books)
        ],
        epochs=10
    )
    
    # Multi-task fine-tuning
    multitask_model = MultiTaskWrapper(base_model)
    multitask_model.add_task(Task.DIAGNOSIS, DiagnosisHead())
    multitask_model.add_task(Task.MATCHING, MatchingHead())
    multitask_model.add_task(Task.CURRICULUM, CurriculumHead())
    
    # Federated learning setup
    fl_strategy = FederatedStrategy(
        hospitals=[HospitalA, HospitalB, HospitalC],
        privacy="differential"
    )
    
    return fl_strategy.train(multitask_model)
`}
      </pre>

      <h3>🌍 Global Deployment Architecture</h3>
      <div className="integration-placeholder">[Deployment Diagram Placeholder]</div>
      <pre className="code-block">
{`# Example: Regionalized docker-compose and k8s configs per region, edge caching, compliance rules`}
      </pre>

      <h3>🔒 Security & Compliance System</h3>
      <div className="integration-placeholder">[Zero-Trust Data Handling Diagram Placeholder]</div>
      <pre className="code-block">
{`go
package compliance

func Validate(request Request) bool {
    region := geoip.Resolve(request.IP)
    
    switch region.RegulationFramework {
    case "HIPAA":
        return validateHIPAA(request)
    case "GDPR":
        return validateGDPR(request)
    case "HITECH":
        return validateHITECH(request)
    default:
        return validateDefault(request)
    }
}

func validateHIPAA(request) bool {
    // PHI detection and handling
    if containsPHI(request.Data) {
        return request.Consent.MedicalDataSharing && 
               request.User.IsVerifiedProfessional
    }
    return true
}
`}
      </pre>

      <h3>🛠️ DevOps & SRE Toolchain</h3>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Primary Tools</th>
            <th>Secondary Tools</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Infrastructure</td>
            <td>Terraform, Crossplane, Pulumi</td>
            <td>AWS CDK, GCP Deployment Mgr</td>
          </tr>
          <tr>
            <td>Orchestration</td>
            <td>Kubernetes, Nomad</td>
            <td>Docker Swarm</td>
          </tr>
          <tr>
            <td>Service Mesh</td>
            <td>Istio, Linkerd</td>
            <td>Consul</td>
          </tr>
          <tr>
            <td>CI/CD</td>
            <td>ArgoCD, Flux, Tekton</td>
            <td>Jenkins, CircleCI</td>
          </tr>
          <tr>
            <td>Monitoring</td>
            <td>Prometheus, Grafana, OpenTelemetry</td>
            <td>Datadog, New Relic</td>
          </tr>
          <tr>
            <td>Logging</td>
            <td>Loki, ELK Stack</td>
            <td>Splunk, Sumo Logic</td>
          </tr>
          <tr>
            <td>Secrets</td>
            <td>Vault, AWS Secrets Manager</td>
            <td>Doppler, Akeyless</td>
          </tr>
          <tr>
            <td>Chaos Engineering</td>
            <td>Chaos Mesh, Gremlin</td>
            <td>Litmus</td>
          </tr>
        </tbody>
      </table>

      <h3>🧪 Testing Strategy Matrix</h3>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>Test Type</th>
            <th>Medical Specifics</th>
            <th>Tools</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Diagnostic Accuracy</td>
            <td>Validation against JAMA gold standards</td>
            <td>Custom Test Harness</td>
            <td>Per Model Update</td>
          </tr>
          <tr>
            <td>Matching Fairness</td>
            <td>Bias detection across demographic groups</td>
            <td>Aequitas, Fairlearn</td>
            <td>Weekly</td>
          </tr>
          <tr>
            <td>Compliance Audit</td>
            <td>HIPAA/GDPR rule validation</td>
            <td>OPA, Checkov</td>
            <td>Continuous</td>
          </tr>
          <tr>
            <td>Geolocation Accuracy</td>
            <td>Distance calculations to real hospitals</td>
            <td>Google Maps API</td>
            <td>Daily</td>
          </tr>
          <tr>
            <td>Load Testing</td>
            <td>Simulate residency match day traffic</td>
            <td>Locust, k6</td>
            <td>Before Events</td>
          </tr>
          <tr>
            <td>Penetration Testing</td>
            <td>Medical data breach simulation</td>
            <td>Burp Suite, Metasploit</td>
            <td>Quarterly</td>
          </tr>
        </tbody>
      </table>

      <h3>🚦 Implementation Roadmap (Detailed)</h3>
      <ul>
        <li>
          <b>Month 1: Foundation</b>
          <div className="integration-placeholder">[Diagram Placeholder]</div>
          <pre className="code-block">{`# Infra setup, security baseline, compliance modules`}</pre>
        </li>
        <li>
          <b>Month 2: Core Services</b>
          <div className="integration-placeholder">[Diagram Placeholder]</div>
          <pre className="code-block">{`# Matching, learning, and job modules`}</pre>
        </li>
        <li>
          <b>Month 3: AI & Launch</b>
          <div className="integration-placeholder">[Diagram Placeholder]</div>
          <pre className="code-block">{`# AI models, monitoring, launch`}</pre>
        </li>
      </ul>

      <h3>⚠️ Critical Risk Mitigation</h3>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>Risk</th>
            <th>Mitigation Strategy</th>
            <th>Owner</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Medical AI Misdiagnosis</td>
            <td>Human-in-loop validation layer</td>
            <td>Chief Medical Off</td>
            <td>Month 2</td>
          </tr>
          <tr>
            <td>Data Breach</td>
            <td>Confidential computing + blockchain audit</td>
            <td>CISO</td>
            <td>Month 1</td>
          </tr>
          <tr>
            <td>Matching Bias</td>
            <td>Weekly fairness audits + bias correction algorithms</td>
            <td>AI Ethics Lead</td>
            <td>Ongoing</td>
          </tr>
          <tr>
            <td>Global Compliance Gaps</td>
            <td>Localized compliance pods + regional experts</td>
            <td>Compliance Lead</td>
            <td>Month 2</td>
          </tr>
          <tr>
            <td>Hospital Integration Failure</td>
            <td>Fallback to web scraping + manual entry</td>
            <td>Integration Eng</td>
            <td>Month 3</td>
          </tr>
        </tbody>
      </table>

      <h3>💻 Developer Environment Setup</h3>
      <pre className="code-block">
{`bash
# 1. Clone monorepo
git clone https://github.com/medlearn/platform

# 2. Start local cluster
medlearn infra start --region=simulated

# 3. Seed test data
medlearn db seed medical-test-data

# 4. Run services
medlearn service start all

# 5. Access components:
#   - API: http://localhost:8080
#   - Monitoring: http://localhost:3000
#   - AI Playground: http://localhost:8888
`}
      </pre>

      <h3>📜 Engineering Standards</h3>
      <ul>
        <li>
          <b>Medical Data Handling Protocol</b>
          <ul>
            <li>Never store raw patient data</li>
            <li>Anonymization before processing</li>
            <li>Ephemeral containers for sensitive operations</li>
          </ul>
        </li>
        <li>
          <b>AI Development Charter</b>
          <ul>
            <li>Model cards for all medical AI</li>
            <li>Explainability reports</li>
            <li>Physician validation for diagnostic tools</li>
          </ul>
        </li>
        <li>
          <b>Global Deployment Policy</b>
          <ul>
            <li>Data residency enforcement</li>
            <li>Regional service isolation</li>
            <li>Compliance-by-default design</li>
          </ul>
        </li>
        <li>
          <b>Incident Response Playbook</b>
          <ul>
            <li>Medical data breach: Immediate containment</li>
            <li>Diagnostic system failure: Fallback to human experts</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}